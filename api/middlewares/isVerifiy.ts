import { NextFunction, Response } from "express";
import { RequestAuth } from "./authToken";
import { IUser } from "../schemas/user";

export const isVerifyMiddleware = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const user: IUser = req.user;

    try {
      if (!user.isVerified) {
        return res.status(401).json({ message: "User is not verified" });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        message: "Error checking if user is verified",
        error: (error as Error).message,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Error in IsVerifyMiddleware", error });
  }
};
