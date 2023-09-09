import dotenv from "dotenv";
import transporter from "./transporter";

dotenv.config();

export const sendInvitationMail = async (
  recipient: string,
  invitationToken: string
): Promise<void> => {
  const invitationLink = `https://example.com/response/${invitationToken}`;
  const mailOptions = {
    from: process.env.MAILER_FROM,
    to: recipient,
    subject: "Your were invited for resplying a questionary!",
    html: `Click the following link start the questionary: <a href="${invitationLink}">REPLY!</a>`,
  };

  await transporter.sendMail(mailOptions);
};
