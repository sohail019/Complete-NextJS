import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please Provide a Username"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please Provide an Email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please Provide a Password"],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
})


//Create Model
const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User