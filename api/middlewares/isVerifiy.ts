import { Request, NextFunction, Response } from "express";
import { RequestAuth } from "./authToken";

export const isVerifyMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { isVerified } = (req as RequestAuth).user;

    if (!isVerified) {
      return res.status(401).json({ message: "User is not verified" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Error in IsVerifyMiddleware", error });
  }
};
