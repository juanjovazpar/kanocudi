import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcryptjs";

// Define the User interface for TypeScript
interface IUser extends Document {
  email: string; // Change to email as the identifier
  password: string;
  name: string;
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
  // You can add more fields as needed for your user data (e.g., name, etc.).
});

// Hash the password before saving it to the database
userSchema.pre<IUser>("save", async function (next) {
  try {
    // Generate a salt for password hashing
    const salt = await bcrypt.genSalt(10);

    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(this.password, salt);

    // Replace the plain password with the hashed password
    this.password = hashedPassword;

    if (!this.name) {
      this.name = "";
    }

    next();
  } catch (error) {
    next(error);
  }
});

// Create a User model from the schema
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export { User, IUser };
