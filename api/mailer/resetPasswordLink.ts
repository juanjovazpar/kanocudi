import dotenv from "dotenv";
import transporter from "./transporter";

dotenv.config();

export const sendResetPasswordLink = async (
  recipient: string,
  resetPasswordToken: string
): Promise<void> => {
  const verificationLink = `https://example.com/reset/${resetPasswordToken}`;
  const mailOptions = {
    from: process.env.MAILER_FROM,
    to: recipient,
    subject: "Reset your password",
    html: `Click the following link to reset password: <a href="${verificationLink}">RESET YOUR PASSWORD</a>`,
  };

  await transporter.sendMail(mailOptions);
};
