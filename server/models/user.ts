import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

// Define the User interface for TypeScript
interface IUser extends Document {
  email: string; // Change to email as the identifier
  password: string;
  name: string;
  isVerified: boolean;
  verificationToken?: string;
  resetPasswordToken?: string;
}

// Define the User schema
const userSchema: Schema<IUser> = new Schema({
  email: {
    type: String,
    unique: true, // Ensure uniqueness for email
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  verificationToken: {
    type: String,
  },
  resetPasswordToken: {
    type: String,
  },
});

userSchema.pre<IUser>("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);

    this.password = hashedPassword;

    if (!this.name) {
      this.name = "Unknown";
    }

    next();
  } catch (error) {
    next(error);
  }
});

// Create a User model from the schema
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export { User, IUser };
