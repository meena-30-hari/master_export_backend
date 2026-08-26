import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/tradeflow_erp";

export async function connectDatabase() {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
}
