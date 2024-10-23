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
    const user: User =  session?.user as User //?

    if(!session || !session.user){

    }
}