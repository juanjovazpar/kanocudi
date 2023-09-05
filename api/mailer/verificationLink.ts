import dotenv from "dotenv";
import transporter from "./transporter";

dotenv.config();

export const sendVerificationLink = async (
  recipient: string,
  verificationToken: string
): Promise<void> => {
  const verificationLink = `https://example.com/verify/${verificationToken}`;
  const mailOptions = {
    from: process.env.MAILER_FROM,
    to: recipient,
    subject: "Verify Your Account",
    html: `Click the following link to verify your account: <a href="${verificationLink}">VERIFY YOUR ACCOUNT</a>`,
  };

  await transporter.sendMail(mailOptions);
};
