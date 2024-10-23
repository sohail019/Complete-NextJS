import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const {username, email, password }= await request.json()

    //? Check if user exists and verified
    const exisitingUserVerifiedByUsername =  await UserModel.findOne({
        username,
        isVerified: true
    })

    if(exisitingUserVerifiedByUsername){
        return Response.json({
            success: false,
            message: "Username is Already Taken"
        }, {status: 400})
    }

    //? Check if user already exists by email
    const existingUserByEmail = await UserModel.findOne({email})
    let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    if(existingUserByEmail){
        if(existingUserByEmail.isVerified){
            return Response.json(
              {
                success: false,
                message: "User already exists with this email",
              },
              { status: 400 }
            );
        } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
        await existingUserByEmail.save();
        }
    } else{
        const hashedPassword = await bcrypt.hash(password, 10)
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1);

        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword,
            verifyCode,
            verifyCodeExpiry: expiryDate,
            isVerified: false,
            isAcceptingMessage: true,
            messages: []
        })

        await newUser.save()
    } 

    console.log(verifyCode);
    
    //* Send Verification Email
    const emailResponse = await sendVerificationEmail(
        email,
        username,
        verifyCode
    )


    if(!emailResponse.success) {
        return Response.json({
            success: false,
            message: emailResponse.message
        }, {status: 500})
    }

    return Response.json({
        success: true,
        message: emailResponse.message
    }, {status: 201})

  } catch (error) {
    console.error("Error Registering User", error);
    return Response.json(
      {
        success: false,
        message: "Error Registering User",
      },
      {
        status: 500,
      }
    );
  }
}
