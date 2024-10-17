import { log } from "console";
import mongoose from "mongoose";

export async function connect () {
    try {
        mongoose.connect(process.env.Mongo_URI!)
        const connection = mongoose.connection

        connection.on('connected', () => {
            console.log("MongoDB Connected");
        })

        connection.on('error', (err) => {
            console.error("MongoDB Connection Failed, Please Make Sure Everything is Up and Fine" + err)
        })

    } catch (error) {
        console.error("Something Went Wrong in Connecting to Database");
        console.error(error)
    }
}