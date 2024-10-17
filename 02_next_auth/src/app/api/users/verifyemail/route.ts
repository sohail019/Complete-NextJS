import User from "@/models/userModel";
import { connect } from "@/database/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {token} = reqBody
        console.log(token)

        //Assume token has come
        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}});

        //Check if user is not exist
        if(!user){
            return NextResponse.json({ error: "Invalid Token" }, { status: 400 });
        }

        console.log(user);

        //? Clear the field
        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined

        //? Save the user
        await user.save()

        // ? Return the response
        return NextResponse.json({ error: "Email Verified Successfully", success: true }, { status: 500 });
        
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
