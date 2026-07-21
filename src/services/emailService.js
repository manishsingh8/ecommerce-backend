const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOTPEmail = async (email, otp, name) => {
  try {
    const response = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Your Login Verification Code",
      html: `
        <div style="font-family: Arial, sans-serif; padding:20px;">
            <h2>Hello ${name},</h2>

            <p>Your OTP for login is:</p>

            <h1 style="
                letter-spacing:6px;
                color:#2563eb;
            ">
                ${otp}
            </h1>

            <p>This OTP will expire in <b>5 minutes</b>.</p>

            <p>If you didn't request this login, please ignore this email.</p>

            <br/>

            <p>
                Regards,<br/>
                Ecommerce Team Manager
                <br/>
                Manish
            </p>
        </div>
      `,
    });

    console.log("Email sent:", response);
  } catch (err) {
    console.error("Email Error:", err);
    throw err;
  }
};

module.exports = sendOTPEmail;