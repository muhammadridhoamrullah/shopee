const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_SMTP_HOST,
  port: process.env.NODEMAILER_SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_SMTP_USER,
    pass: process.env.NODEMAILER_SMTP_PASS,
  },
});

async function sendNotificationLogin(data) {
  const mailOptions = {
    from: process.env.NODEMAILER_SMTP_USER,
    to: data.email,
    subject: `Shopee - New Login Notification`,
    html: `
        <h1>New Login Notification</h1>
        <p>Hello ${data.email},</p>
        <p>You have successfully logged in to your Shopee account.</p>
        <p>If you did not initiate this login, please contact our support team immediately.</p>
        <p>Thank you for using Shopee!</p>


        <p>Best regards,</p>
        <p>The Shopee Team</p>
        
    `,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log(result, "email sent successfully");
    return result;
  } catch (error) {
    console.log(error, "error pada login nodemailer");

    throw { name: "EMAIL_SEND_FAILED", message: error.message };
  }
}

module.exports = {
  sendNotificationLogin,
};
