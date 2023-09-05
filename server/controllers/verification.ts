import { Request, Response } from "express";
import { User } from "../models/user";

export const verifyUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { verificationToken } = req.params;

  try {
    const user = await User.findOne({ verificationToken });

    if (!user) {
      return res.status(404).json({ message: "Invalid verification token" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.json({ message: "Account verified successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error during verification", error: error.message });
  }
};
