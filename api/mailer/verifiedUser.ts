import dotenv from "dotenv";
import transporter from "./transporter";

dotenv.config();

export const sendVerifiedUser = async (recipient: string): Promise<void> => {
  const link = `https://example.com/sigin`;
  const mailOptions = {
    from: process.env.MAILER_FROM,
    to: recipient,
    subject: "Verified Account",
    html: `Click the following link to signin in your account: <a href="${link}">SIGN IN</a>`,
  };

  await transporter.sendMail(mailOptions);
};
