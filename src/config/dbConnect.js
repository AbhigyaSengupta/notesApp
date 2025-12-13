import mongoose from "mongoose";

export async function dbConnect() {
    try {
        await mongoose.connect(process.env.URL)
        console.log("DB connected");
    } catch (error) {
        console.log("Db is not connected", error);
    }
}