import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

async function dbConnect():Promise<void> {
    if(connection.isConnected){
        console.log("Already Connected to the Database")
        return
    }

    try {
        //* Attempt to connect database
        const db = await mongoose.connect(process.env.MONGODB_URI || "", {});

        //? this sets the isConnected property of the connection object to the current connection state of the first database connection established by mongoose
        connection.isConnected = db.connections[0].readyState

        console.log("Database Connected Successfully")
    } catch (error) {
        console.error("Database Connection Failed", error);

        //! Gracefully exit in case of a connection error
        process.exit(1)
    }
}

export default dbConnect