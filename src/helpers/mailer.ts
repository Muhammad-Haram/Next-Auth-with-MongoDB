import nodemailer from "nodemailer";

export const sentEmail = async ({ email, emailType, userId }: any) => {
  try {
    //TODO: configure mail for usage

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: "maddison53@ethereal.email",
        pass: "jn7jnAPss4f63QBp6D",
      },
    });

    const mailOptions = {
      from: "haramh643@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verified your email" : "Reset your password",
      html: "<b>Hello world?</b>",
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
