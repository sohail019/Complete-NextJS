import mongoose, {Schema, Document} from "mongoose"

//? Message Interface
export interface Message extends Document{
    content: string;
    createdAt: Date;
}

//? Message Schema
const MessageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

//? User Interface
export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean,
    messages: Message[]
}

//? Updated User Schema

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is Required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
    match: [/.+\@.+\..+/, "Please use a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
  },
  verifyCode: {
    type: String,
    required: [true, "Verification Code is Required"],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "Verification Code Expiry is Required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessages: {
    type: Boolean,
    default: true,
  },
  messages: [MessageSchema],
});


//* This checks if a Mongoose model named "User" already exists! and if not, creates a new one using the UserSchema.
//? The as keyword is used for type casting to ensure the model conforms to the User interface.
const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", UserSchema))

export default UserModel