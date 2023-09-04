import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUser, User } from "../models/user";

const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract username and password from the request body
    const { username, password } = req.body;

    // Check if the username is already taken
    const existingUser: IUser | null = await User.findOne({ username });

    // If the username is already in use, return an error
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password before saving it
    const hashedPassword: string = await bcrypt.hash(password, 10); // You can adjust the saltRounds (10) as needed

    // Create a new user
    const newUser: IUser = new User({
      username,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    // Return a success message
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract username and password from the request body
    const { username, password } = req.body;

    // Find the user by their username in the database
    const user: IUser | null = await User.findOne({ username });

    // If the user is not found, return an error
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
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET, // Replace with your JWT secret
      { expiresIn: "1h" } // Token expiration time (adjust as needed)
    );

    // Return the token as a response
    res.status(200).json({ token, userId: user._id, username: user.username });
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error during login:", error);
    res.status(500).json({ message: "Error during login" });
  }
};

const forgot_password = async (req: Request, res: Response): Promise<void> => {
  try {
    // ... (forgot_password controller logic)
  } catch (error) {
    res.status(500).json({
      message: "Error during forgot password ",
      error: (error as Error).message,
    });
  }
};

export { signup, login, forgot_password };
