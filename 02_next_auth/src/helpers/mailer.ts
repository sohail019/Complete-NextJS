import nodemailer from "nodemailer"

export const sendEmail =async ({email, emailType, userId}: any) => {
    try {

        //todo: Configure mail for usage

        const transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false, // true for port 465, false for other ports
          auth: {
            user: "maddison53@ethereal.email",
            pass: "jn7jnAPss4f63QBp6D",
          },
        });

        const mailOptions = {
          from: 'info@sohailwebdev.com', // sender address
          to: email, // list of receivers
          subject: emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password", // Subject line
          text: "Hello world?", // plain text body
          html: "<b>Hello world?</b>", // html body
        };

        const mailResponse = await transporter.sendMail(mailOptions)
        console.log("Message sent: %s", mailResponse.messageId);
    } catch (error) {
        console.error("Error", error);
        
    }
}