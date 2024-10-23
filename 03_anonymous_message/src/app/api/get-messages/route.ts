//todo:  Create an API route to retrieves the list of messages for authenticated users form a MongoDB database using aggregation.
//* The messages should be sorted by the most recent (createdAt field), and the entire process should ensure that only authenticated users can access their messages

import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import mongoose from "mongoose";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

//* Handler for GET requests
export async function GET(request: Request) {
  await dbConnect();

  //* Retrieve the user session using NextAuth
  const session = await getServerSession(authOptions);
  const _user: User = session?.user as User; //? Extract user from session

  //? Check if the user is authenticated
  if (!session || !_user) {
    return Response.json(
      { success: false, message: "Not authenticated" }, // Respond with an error if not authenticated
      { status: 401 }
    );
  }

  //* Convert the user's ID to a mongoose ObjectId type
  const userId = new mongoose.Types.ObjectId(_user._id)

  try {
    //* Use MongoDB aggregation to retrieve and sort messages
    const user = await UserModel.aggregate([
      { $match: { _id: userId } }, //? Match the user by their ID
      { $unwind: "$messages" }, //? unwind the messages array to work with individual messages
      { $sort: { "messages.createdAt": -1 } }, //? Sort messages in descending order by createdAt
      { $group: { _id: "$_id", messages: { $push: "$messages" } } }, //? Group messages back together after sorting
    ]).exec();

    //! If the user is not found or has no messages, return a 404 error
    if (!user || user.length === 0) {
      return Response.json(
        { message: "User not found", success: false }, //! Error message for user not found
        { status: 404 }
      );
    }

    //* Return the sorted messages in the response
    return Response.json(
      { messages: user[0].messages }, //* Success response with sorted messages
      { status: 200 }
    );
  } catch (error) {
    //! Handle any unexpected errors during the aggregation process
    console.error("An unexpected error occurred:", error);
    return Response.json(
      { message: "Internal server error", success: false }, //! Error response for internal server issues
      { status: 500 }
    );
  }
}
