import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IUser, User } from "../schemas/user";

export interface RequestAuth extends Request {
  user: IUser;
}

export const authTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const token: string | undefined = (
      req.headers.authorization || (req.query.token as string)
    )?.replace("Bearer ", ""); // TODO: Clean the headers from this prefix

    if (!token) {
      return res.status(401).json({ message: "Authentication token missing" });
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Invalid authentication token" });
      }

      User.findById((decoded as JwtPayload).userId)
        .then((user: IUser | null) => {
          if (!user) {
            return res.status(401).json({ message: "User not found" });
          }

          (req as RequestAuth).user = user;

          next();
        })
        .catch((error: Error) => {
          return res.status(500).json({
            message: "Error authenticating user",
            error: error.message,
          });
        });
    });
  } catch (error) {
    res.status(500).json({ message: "Error in AuthTokenMiddleware", error });
  }
};
