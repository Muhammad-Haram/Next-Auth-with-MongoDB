import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sentEmail = async ({ email, emailType, userId }: any) => {

  try {
    //TODO: configure mail for usage

    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 })
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 })
    }

    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "20e25c77b71b71",
        pass: "75a6ebf07fe6ff"
      }
    });

    const verifyHtml = `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} or copy and paste the link below in your browser <br/>
    ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
    </p>`

    const mailOptions = {
      from: "haramh643@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verified your email" : "Reset your password",
      html: verifyHtml, 
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};