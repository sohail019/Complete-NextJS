//todo:  Create an API route to send a message to a user in the system, it checks if the user exists and whether they are accepting messages. If everything is valid, the new message is added to the user's message array, and the database is updated

import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { Message } from "@/model/User";

//* Handler for POST request
export async function POST(request: Request) {
  await dbConnect();

  //* Parse the request body to get username and message content
  const { username, content } = await request.json();

  try {
    const user = await UserModel.findOne({ username }).exec();

    //? If the user is not found, return a 404 Not Found response
    if (!user) {
      return Response.json(
        { message: "User not found", success: false }, //! Respond that user doesn't exist
        { status: 404 }
      );
    }

    //? Check if the user is accepting messages
    if (!user.isAcceptingMessages) {
      return Response.json(
        { message: "User is not accepting messages", success: false }, //! Respond that user is not accepting messages
        { status: 403 } //! 403 Forbidden status when action is not allowed
      );
    }

    //* Create a new message with the content and the current date/time
    const newMessage = { content, createdAt: new Date() };

    //* Push the new message to the user's messages array
    user.messages.push(newMessage as Message);

    //* Save the updated user document to the database
    await user.save();

    //* Return a success response when the message is successfully added
    return Response.json(
      { message: "Message sent successfully", success: true }, //* Message successfully sent
      { status: 201 }
    );
  } catch (error) {
    //! Log any errors that occur during message addition
    console.error("Error adding message:", error);

    //! Return an internal server error response if something goes wrong
    return Response.json(
      { message: "Internal server error", success: false }, //! Generic error message for server issues
      { status: 500 }
    );
  }
}
