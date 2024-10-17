import User from "@/models/userModel";
import { connect } from "@/database/dbConfig";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest) {
  try{

    //How to login for user, take data
    const reqBody = await request.json()
    const {email, password} = reqBody
    console.log(reqBody);

    const user = await User.findOne({email})

    if(!user) {
        return NextResponse.json({ error: "User Not Found" }, { status: 400 });
    }

    console.log("User Found")

    // Check Credentials for password matching
    const validPassword = await bcryptjs.compare(password, user.password)

    if(!validPassword){
        return NextResponse.json({ error: "Password Do Not Match" }, { status: 400 });
    }

    //? If password match, create JWT token
    const tokenData = {
        id: user._id,
        username: user.username,
        email: user.email
    }

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'});

    const response = NextResponse.json({
        message: "Logged In Successfully",
        success: true
    })

    response.cookies.set("token", token, {
        httpOnly: true
    })

    return response
    
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}