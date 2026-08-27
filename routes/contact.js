import express from "express";
import resend from "../config/mailer.js";

const router = express.Router();

router.post("/contact", async (req, res) => {
    try {
        const { name, email, country, message } = req.body;

        if (!name || !email || !country || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const { data, error } = await resend.emails.send({
            from: "Master Export Pro <onboarding@resend.dev>",
            to: [process.env.ADMIN_EMAIL],
            replyTo: email,
            subject: `New Contact Inquiry from ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif;">
                    <h2>New Contact Inquiry</h2>

                    <p>
                        <strong>Name:</strong> ${name}
                    </p>

                    <p>
                        <strong>Email:</strong> ${email}
                    </p>

                    <p>
                        <strong>Country:</strong> ${country}
                    </p>

                    <h3>Message</h3>

                    <p>${message}</p>
                </div>
            `,
        });

        if (error) {
            console.error("Resend Error:", error);

            return res.status(500).json({
                success: false,
                message: error.message || "Failed to send email",
            });
        }

        console.log("Email sent successfully:", data);

        return res.json({
            success: true,
            message: "Message sent successfully",
        });

    } catch (error) {
        console.error("Contact Error:", error);

        return res.status(500).json({
            success: false,
            message: error instanceof Error
                ? error.message
                : "Failed to send message",
        });
    }
});

export default router;