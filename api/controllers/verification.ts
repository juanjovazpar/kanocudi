import { Request, Response } from "express";
import { User } from "../schemas/user";
import { sendVerifiedUserMail } from "../mailer/verifiedUser";

export const verifyUser = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const { verificationToken } = req.params;

  try {
    const user = await User.findOne({ verificationToken });

    if (!user) {
      return res.status(401).json({ message: "Invalid verification token" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();
    await sendVerifiedUserMail(user.email);

    res.json({ message: "Account verified successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error during verification",
      error,
    });
  }
};
