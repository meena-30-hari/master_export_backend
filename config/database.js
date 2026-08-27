import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

export async function connectDatabase() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.log("MongoDB connection failed",error)
        process.exit(1);
    }
}
