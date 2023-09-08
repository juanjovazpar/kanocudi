import { Request, Response } from "express";
import { RequestAuth } from "../middlewares/authToken";

export const getLoggedUser = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const user = (req as RequestAuth).user;

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "User not found",
      error,
    });
  }
};
