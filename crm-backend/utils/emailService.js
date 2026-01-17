const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendOtpEmail = async (username, otp) => {
    const targetEmail = process.env.OTP_TARGET_EMAIL; // Admin email to receive OTPs

    if (!targetEmail) {
        console.error('OTP_TARGET_EMAIL not set');
        return;
    }

    const mailOptions = {
        from: `"CRM Security" <${process.env.SMTP_USER}>`,
        to: targetEmail,
        subject: `CRM Login OTP for ${username}`,
        text: `User '${username}' is trying to log in.\n\nHere is the OTP: ${otp}\n\nThis OTP expires in 5 minutes.`,
        html: `
            <h3>CRM Login Attempt</h3>
            <p>User <strong>${username}</strong> is trying to log in.</p>
            <p>Your OTP is:</p>
            <h2>${otp}</h2>
            <p>This OTP expires in 5 minutes.</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`OTP sent to ${targetEmail} for user ${username}`);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = { sendOtpEmail };
