import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUser, User } from "../models/user";

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const existingUser: IUser | null = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);
    const newUser: IUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user: IUser | null = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Authentication failed. User not found." });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch: boolean = await bcrypt.compare(
      password,
      user.password
    );

    // If passwords don't match, return an error
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "Authentication failed. Incorrect password." });
    }

    // If authentication is successful, generate a JSON Web Token (JWT)
    const token: string = jwt.sign(
      { userId: user._id, name: user.name },
      process.env.JWT_SECRET, // Replace with your JWT secret
      { expiresIn: "1h" } // Token expiration time (adjust as needed)
    );

    // Return the token as a response
    res.status(200).json({ token, userId: user._id, name: user.name });
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error during login:", error);
    res.status(500).json({ message: "Error during login" });
  }
};

export const forgot_password = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // ... (forgot_password controller logic)
  } catch (error) {
    res.status(500).json({
      message: "Error during forgot password ",
      error: (error as Error).message,
    });
  }
};

export const verify = async (req: Request, res: Response): Promise<void> => {
  try {
    const verificationToken = req.query.token;
    const [token, expirationTime] = verificationToken.split(".");

    if (expirationTime && Date.now() > parseInt(expirationTime, 10)) {
      return res.status(401).json({ error: "Verification token has expired" });
    }

    const user = await User.findOne({ verificationToken });
    if (!user) {
      return res.status(401).json({ error: "Invalid verification token" });
    }

    user.isVerified = true;
    await user.save();

    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({ message: "Email verification successful" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Verification failed", details: error.message });
  }
};
