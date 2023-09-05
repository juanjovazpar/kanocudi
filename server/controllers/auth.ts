import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUser, User } from "../models/user";
import { sendVerificationLink } from "../mailer/verificationLink";
import { getHashedToken } from "../utils/tokenGenerator";

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const existingUser: IUser | null = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedVerificationToken = await getHashedToken();
    const newUser: IUser = new User({
      email,
      password,
      verificationToken: hashedVerificationToken,
    });

    await newUser.save();
    await sendVerificationLink(email, hashedVerificationToken);

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
};

export const signin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user: IUser | null = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Authentication failed. User not found." });
    }

    const passwordMatch: boolean = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "Authentication failed. Incorrect password." });
    }

    const token: string = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, userId: user._id, email: user.email });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Error during login" });
  }
};
