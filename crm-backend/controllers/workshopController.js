const Workshop = require("../models/Workshop");

const nodemailer = require("nodemailer");


exports.addWorkshop = async (req, res) => {
    try {
        const workshop = new Workshop(req.body);
        await workshop.save();

        try {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: req.body.email,
                subject: "Workshop Registration Confirmation + WhatsApp Community Link",
                text: `Hi ${req.body.name},\n\nThank you for registering for our FREE 2-hour Workshop on Mastering Final Year Projects with AI Tools!\n\n🗓 Date: January 18 (Sunday)\n⏰ Time: 7:00 PM – 9:00 PM\n🎯 Mode: Online (Google meet link will be shared before 1 day of the Workshop)\n\nTo make sure you don't miss anything, please join our WhatsApp Community using the link below:\n👉 https://chat.whatsapp.com/FZoxdKCJzzw0oHSJf0zRSb\n\nAll workshop updates, the joining link, materials, and post-workshop resources will be shared only in this community.\nPlease join immediately to stay updated.\n\nLooking forward to seeing you in the workshop!\n\nBest Regards,\nTeam Qriocity`,
                html: `<div style="font-family: Arial, sans-serif; color: #333;">
          <p>Hi ${req.body.name},</p>
          <p>Thank you for registering for our <strong>FREE 2-hour Workshop on Mastering Final Year Projects with AI Tools!</strong></p>
          <p>
            🗓 <strong>Date:</strong> January 18 (Sunday)<br>
            ⏰ <strong>Time:</strong> 7:00 PM – 9:00 PM<br>
            🎯 <strong>Mode:</strong> Online (Google meet link will be shared before 1 day of the Workshop)
          </p>
          <p>To make sure you don't miss anything, please join our <strong>WhatsApp Community</strong> using the link below:</p>
          <p>👉 <a href="https://chat.whatsapp.com/FZoxdKCJzzw0oHSJf0zRSb" style="color: #007bff; text-decoration: none;">Join WhatsApp Community</a></p>
          <p>All workshop updates, the joining link, materials, and post-workshop resources will be shared <strong>only</strong> in this community.<br>
          Please join immediately to stay updated.</p>
          <p>Looking forward to seeing you in the workshop!</p>
          <p>Best Regards,<br>Team Qriocity</p>
        </div>`,
            };

            await transporter.sendMail(mailOptions);
            console.log("Email sent successfully to:", req.body.email);

            res.status(201).json({
                message: "Workshop registration added successfully and email sent",
                workshop,
            });
        } catch (emailError) {
            console.error("Failed to send email:", emailError);

            res.status(201).json({
                message: "Workshop registration added, but email failed to send.",
                workshop,
                emailError: emailError.message,
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getWorkshops = async (req, res) => {
    try {
        const workshops = await Workshop.find().sort({ createdAt: -1 });
        res.status(200).json(workshops);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
