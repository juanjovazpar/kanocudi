import mongoose, { Document, Schema, Model, CallbackError } from "mongoose";
import { hashPassword } from "../utils/passwords";

interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  isVerified: boolean;
  verificationToken?: string;
  resetPasswordToken?: string;
}

const userSchema: Schema<IUser> = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  name: {
    type: String,
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
    if (!this.name) {
      this.name = "Unknown";
    }

    next();
  } catch (error) {
    next(error as CallbackError);
  }
});

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export { User, IUser };
