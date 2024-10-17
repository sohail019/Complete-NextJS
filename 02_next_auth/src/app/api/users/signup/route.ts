import {connect} from '@/database/dbConfig'
import User from '@/models/userModel'
import bcryptjs from "bcryptjs"
import {NextRequest, NextResponse} from "next/server"
import {sendEmail} from "@/helpers/mailer"

connect()

export const POST = async (request:NextResponse) => {
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody
        console.log(reqBody);
        
        //todo: Validation

        const user = await User.findOne({email})

        //* If User Exists
        if(user) {
            return NextResponse.json({error: "User Already Exists"}, {status: 400})
        }

        //* For New User

        //? Hash Password with the help of bcryptjs
        let salt = await bcryptjs.genSalt(10);
        let hashedPassword = await bcryptjs.hash(password, salt)

        //? New User 
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);
        
        //* Send Verification Mail

        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id});

        return NextResponse.json({
            message: "User Registered Successfully",
            success: true,
            savedUser
        })

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}