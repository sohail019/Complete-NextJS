//todo:  Create API route to update and retrieve a user's message acceptance status that uses NextAuth for authentication and mongodb database

import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

//* Function to handle POST request (update the user's message acceptance status)
export async function POST(request: Request){
    
    await dbConnect() //? connect to database

    //* Get the user's session using NextAuth
    const session = await getServerSession(authOptions)
    const user: User =  session?.user as User //? Extract the user object from the session

    //? Check if the session or object missing, return the 401 error
    if(!session || !session.user){
        return Response.json({
            success: false,
            message: "Not Authenticated" //! error if user is not authenticated
        }, {status: 401})
    }

    //* Get the user ID from the session and parse the request body to get the acceptMessages flag
    const userId = user._id
    const {acceptMessages} = await request.json() //? extract acceptMessages from request body

    try {
        //* Update the user's 'isAcceptingMessages' status in database
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId, //? find the user by Id
            {isAcceptingMessages: acceptMessages}, //? update isAcceptingMessage field
            {new: true} //? // Return the updated user document after the update
        )

        //? Check if user not found, return 404
        if(!updatedUser){
            return Response.json(
              {
                success: false,
                message:
                  "Unable to find user to update message acceptance status", //! error if user is not found
              },
              { status: 404 }
            );
        }

        //? If the update is successful, return the updated user
        return Response.json(
          {
            success: true,
            message: "Message Acceptance status updated successfully", //* Success message
            updatedUser //? Return the updated user
          },
          { status: 200 }
        );
        
    } catch (error) {
      //! Catch and log any errors that occur during the update process
      console.error("Error updating message acceptance status");
      return Response.json(
        {
          success: false,
          message: "Error updating message acceptance status", //! error if something gone wrong
        },
        { status: 500 }
      );
    }
}

//* Function to handle GET request  (Retrieve's the user's acceptance status)
export async function GET(request: Request){
  await dbConnect();

  //* Get the user's session using NextAuth
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User; //? Extract the user object from the session

  //? Check if the session or object missing, return the 401 error
  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated", //! error if user is not authenticated
      },
      { status: 401 }
    );
  }

    try {
        //* Find the user in the database using their ID from the session
        const foundUser = await UserModel.findById(user._id)

        //? Check if the user is not found, return 404
        if(!foundUser){
            return Response.json({
                success: false,
                message: "User Not Found"
            }, {status: 404})
        }

        //* Return the user's message acceptance status
        return Response.json({
          success: true,
          isAcceptingMessages: foundUser.isAcceptingMessages,
        }, {status: 200});
    } catch (error) {
      //! Catch and log any errors that occur during the retrieval process
      console.error("Error retrieving message acceptance status:", error);
      return Response.json(
        {
          success: false,
          message: "Error retrieving message acceptance status",
        }, //! Error message if something goes wrong
        { status: 500 }
      );
    }   
}