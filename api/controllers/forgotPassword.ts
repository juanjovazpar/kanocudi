import { Request, Response } from "express";
import { IUser, User } from "../db/schemas/user";
import { sendResetPasswordMail } from "../mailer/resetPasswordLink";
import { sendPasswordSetMail } from "../mailer/passwordSet";
import { getHashedToken } from "../utils/tokenGenerator";
import { isValidEmail } from "../utils/isValidEmail";
import {
  PASSWORD_RULES,
  comparePasswords,
  hashPassword,
  isValidPassword,
} from "../utils/passwords";

export const forgot_password = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { email } = req.body;

    if (!isValidEmail(email)) {
      res.status(400).json({ message: "Invalid email format" });
      return;
    }

    const user: IUser | null = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ message: "Request failed. User not found." });
      return;
    }

    const hashedResetPasswordToken = await getHashedToken(60 * 60 * 1000);

    user.resetPasswordToken = hashedResetPasswordToken;
    await user.save();
    // await sendResetPasswordMail(user.email, hashedResetPasswordToken);

    res.status(201).json({ message: "Reset password email sent successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error during forgot password",
      error,
    });
  }
};

export const resetPassword = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const { resetPasswordToken } = req?.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({ resetPasswordToken });

    if (!user) {
      res.status(401).json({ message: "Invalid reset password token" });
      return;
    }

    if (!password || !isValidPassword(password)) {
      res
        .status(400)
        .json({ message: `Invalid password format. ${PASSWORD_RULES}` });
      return;
    }

    const passwordMatch: boolean = await comparePasswords(
      password,
      user.password
    );

    if (passwordMatch) {
      res
        .status(401)
        .json({ message: "You must define a password never used before." });
      return;
    }

    const hashedPassword = await hashPassword(password);

    user.resetPasswordToken = undefined;
    user.password = hashedPassword;
    await user.save();

    // await sendPasswordSetMail(user.email);

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error reseting password",
      error,
    });
  }
};
