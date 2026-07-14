import nodemailer from "nodemailer";
import {
  dataNodemailerLogin,
  dataNodemailerVerifiactionEmail,
} from "../type/type";

const transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_SMTP_HOST,
  port: parseInt(process.env.NODEMAILER_SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.NODEMAILER_SMTP_USER,
    pass: process.env.NODEMAILER_SMTP_PASS,
  },
});

export async function sendNotificationLogin(data: dataNodemailerLogin) {
  const mailOptions = {
    from: process.env.NODEMAILER_SMTP_USER,
    to: data.email,
    subject: "SHOPEE - Login Notification",
    html: `
    <h1>Login Notification</h1>

    <p>Hello ${data.username},</p>
    <p>We noticed a login to your account. If this was you, you can safely ignore this email. If you did not log in, please take immediate action to secure your account.</p>
    <p>Thank you for using our service!</p>
    `,
  };
  await transporter.sendMail(mailOptions);
}

export async function sendVerificationEmail(
  data: dataNodemailerVerifiactionEmail,
) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${data.token}&email=${data.email}`;
  const mailOptions = {
    from: process.env.NODEMAILER_SMTP_USER,
    to: data.email,
    subject: "SHOPEE - Email Verification",
    html: `
        <h1>Email Verification</h1>
        <p>Hello ${data.username},</p>
        <p>Thank you for registering with us! Please verify your email address by clicking the link below:</p>
        <a href="${verificationUrl}">Verify Email</a>
        <p>If you did not register for an account, please ignore this email.</p>
        <p>Thank you for using our service!</p>

        <p><small>If you have any questions or need assistance, please contact our support team.</small></p>
        `,
  };
  await transporter.sendMail(mailOptions);
}
