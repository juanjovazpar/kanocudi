import { Request, Response } from "express";
import { IUser, User } from "../models/user";
import { sendResetPasswordLink } from "../mailer/resetPasswordLink";
import { sendPasswordSet } from "../mailer/passwordSet";
import { getHashedToken } from "../utils/tokenGenerator";

export const forgot_password = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email } = req.body;
    const user: IUser | null = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Request failed. User not found." });
    }

    const hashedResetPasswordToken = await getHashedToken(60 * 60 * 1000);

    await sendResetPasswordLink(user.email, hashedResetPasswordToken);

    res.status(201).json({ message: "Reset password email sent successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error during forgot password ",
      error: (error as Error).message,
    });
  }
};

export const resetPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { resetPasswordToken, password } = req.params;

  try {
    const user = await User.findOne({ resetPasswordToken });

    if (!user) {
      return res.status(404).json({ message: "Invalid reset password token" });
    }

    user.resetPasswordToken = undefined;
    user.password = password;
    await user.save();

    await sendPasswordSet(user.email);

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error during verification", error: error.message });
  }
};
