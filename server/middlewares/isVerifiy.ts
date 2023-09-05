import { NextFunction } from "express";

export const isVerifyMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { user } = req.user;

  try {
    if (!user.isVerified) {
      return res.status(401).json({ message: "User is not verified" });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Error checking if user is verified",
      error: error.message,
    });
  }
};
