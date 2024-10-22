//todo: Create API route handler that checks if a username is available in the database

import dbConnect from "@/lib/dbConnect";
import User from "@/model/User";
import { usernameValidationSchema } from "@/schemas/signUpSchema";
import { z } from "zod";

// * Define the zod schema to validate the 'username' query parameter

const UsernameQuerySchema = z.object({
  username: usernameValidationSchema, //? use the usernameValidationSchema from the the signup schema
});

//* Main handler function for GET request
export async function GET(request: Request) {
  await dbConnect();

  try {
    //* Extract the query parameters from the URL of the request
    const { searchParams } = new URL(request.url);
    const queryParam = {
      username: searchParams.get("username"), //? get the username query parameter
    };

    //* Validate the query paramter using zod schema
    const result = UsernameQuerySchema.safeParse(queryParam);

    //? Check if validation fails, return a 400 error response with error message
    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            usernameErrors?.length > 0
              ? usernameErrors.join(", ") //? combine multiple errors, if any
              : "Invalid Query Parameters", //? Default message if no specific error
        },
        { status: 400 }
      );
    }

    //? if validation is successfull, destructure the username from the validated data
    const { username } = result.data;

    //? Check if the verified user with the given username  exists in the database
    const existingVerifiedUser = await User.findOne({
      username,
      isVerified: true,
    });

    //? If a verified user is found , return a 200 response saying username is taken
    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken", // Username is taken
        },
        { status: 200 }
      );
    }

    //? If no verified user is found, return a 200 response saying the username is available
    return Response.json(
      {
        success: true,
        message: "Username is available",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    //! If an error occurs during the process, log the error and return a 500 response
    console.error("Error Checking Username", error);

    return Response.json(
      {
        success: false,
        message: "Error Checking Username",
      },
      { status: 500 }
    );
  }
}
