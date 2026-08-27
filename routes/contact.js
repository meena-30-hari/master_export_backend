import express from "express";
import sendEmail from "../config/mailer.js";
console.log("CONTACT ROUTER FILE LOADED");

const router = express.Router();

router.post("/contact", async (req, res) => {
    console.log("🔥 CONTACT API HIT");

    try {
        const { name, email, country, message } = req.body;

        if (!name || !email || !country || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        await sendEmail.sendMail({
            from: process.env.MAIL_USER,
            to: process.env.ADMIN_EMAIL,
            replyTo: email,
            subject: `New Contact Inquiry from ${name}`,
            html: `
        <div style="font-family: Arial, sans-serif;">
            <h2>New Contact Inquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Country:</strong> ${country}</p>
            <h3>Message</h3>
            <p>${message}</p>
        </div>
    `,
        });

        res.json({
            success: true,
            message: "Message sent successfully",
        });
    } catch (error) {
        console.error("Mail Error:", error);

        res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to send message",
        });
    }
});

export default router;