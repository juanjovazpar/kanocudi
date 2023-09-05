import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUser, User } from "../models/user";

export const authTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token: string | undefined =
    req.headers.authorization || req.query.token;

  if (!token) {
    return res.status(401).json({ message: "Authentication token missing" });
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    async (err, decoded: { userId: string }) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }

      try {
        const user: IUser | null = await User.findById(decoded.userId);

        if (!user) {
          return res.status(401).json({ message: "User not found" });
        }

        req.user = user;

        next();
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Error authenticating user", error: error.message });
      }
    }
  );
};
