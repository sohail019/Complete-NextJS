//todo: Create a API route handler to verify a user's account through a verification code sent during the signup process

import dbConnect from "@/lib/dbConnect";
import User from "@/model/User";

//* main POST request handler function

export async function POST(request: Request) {
  await dbConnect();

  try {
    //* Parse the request body to extract the username and verification code
    const { username, code } = await request.json();

    //* Decode the username in case it contains special characters (e.g spaces, symbols)
    const decodedUsername = decodeURIComponent(username);

    //* Look for a user in the database that matches the decoded username
    const user = await User.findOne({ username: decodedUsername });

    //? Check if user is not found, return 404 error
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    //? Check if the verification code matches the one stored in the database
    const isCodeValid = user.verifyCode === code;

    //? Check if the verification code has not expired
    const isCodeNotExpired = new Date(user.verifyCode) > new Date();

    //? If both the code is valid and the code has not expired
    if (isCodeValid && isCodeNotExpired) {
      //* Update the user's status to verified in the database
      user.isVerified = true;
      await user.save(); //? save the updated user to the database

      //* Return a success response indicating the account has been verified
      return Response.json(
        { success: true, message: "Account verified successfully" },
        { status: 200 } //? HTTP status code 200 for success
      );
    }
    //? If the code has expired
    else if (!isCodeNotExpired) {
      return Response.json(
        { success: false, message: "Verification Code has Expired, Please Sign Up Again to get a new code" },
        { status: 400 } //? HTTP status code 400 for bad request
      );
    }

    //? If code is incorrect
    else{
        return Response.json(
          { success: false, message: "Incorrect Verification Code" },
          { status: 400 } //? HTTP status code 400 for bad request
        );
    }
  } catch (error) {
    //! If an error occurs, log it to the console for debugging
    console.error("Error verifying user:", error);

    //! Return a 500 error response indicating an internal server error
    return Response.json(
      { success: false, message: "Error verifying user" },
      { status: 500 } //? HTTP status code 500 for "Internal Server Error"
    );
  }
}
