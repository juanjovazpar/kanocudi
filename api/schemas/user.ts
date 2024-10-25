import mongoose, { Document, Schema, Model, CallbackError } from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  isVerified: boolean;
  verificationToken?: string;
  resetPasswordToken?: string;
  last_login?: Date;
  creation_date?: Date;
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
  last_login: {
    type: Date,
  },
  creation_date: {
    type: Date,
  },
});

userSchema.pre<IUser>("save", async function (next) {
  try {
    if (!this.name) {
      this.name = "Unknown";
    }

    if (!this.creation_date) {
      this.creation_date = new Date();
    }

    next();
  } catch (error) {
    next(error as CallbackError);
  }
});

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export { User, IUser };
