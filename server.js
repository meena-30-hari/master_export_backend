import "dotenv/config";
import express from "express";
import cors from "cors";
import contactRouter from "./routes/contact.js";
import { connectDatabase } from "./config/database.js";

const app = express();

app.use(
    cors({
        origin: ["https://master-export-nine.vercel.app",],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());

app.use("/api", contactRouter);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "TradeFlow backend is running",
    });
});

const PORT = process.env.PORT || 5000;

connectDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    });