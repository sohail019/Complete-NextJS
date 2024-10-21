import { resend } from "@/lib/resend";
import VerificationEmail from "../../email/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";


export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    
    try {
        await resend.emails.send({
          from: "Sohail | Anonymous Message <onboarding@resend.dev>",
          to: email,
          subject: "Anonymous Message App Verification Code",
          react: VerificationEmail({username, otp: verifyCode}),
        });

        return {success: true, message: "Email Verification Sent Successfully"}
    } catch (error) {
        console.error("Error Sending Verification Email", error);
        return {success: false, message: "Failed to send verification email"}
        
    }
}