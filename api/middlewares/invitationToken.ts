import { Request, NextFunction, Response } from "express";
import { IInvitation, Invitation } from "../db/schemas/invitation";
import { IProduct, Product } from "../db/schemas/product";
import { RequestProduct } from "./productOwnership";

export interface RequestInvitation extends Request {
  invitation: IInvitation;
}

export const invitationTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { invitation_token } = req?.params;

    if (!invitation_token) {
      res.status(401).json({ message: "No invitation token provided" });
      return;
    }
    const invitation = await Invitation.findOne({ token: invitation_token });

    if (!invitation) {
      res.status(401).json({ message: "Invalid invitation token" });
      return;
    }

    if (invitation.response) {
      res.status(401).json({ message: "Invitation token already used" });
      return;
    }

    const product: IProduct | null = await Product.findById(
      invitation.product
    ).populate([{ path: "features", select: "-product -__v" }]);

    if (!product) {
      res.status(401).json({ message: "Product not found" });
      return;
    }

    (req as RequestInvitation).invitation = invitation;
    (req as RequestProduct).product = product;

    next();
  } catch (error) {
    res.status(500).json({
      message: "Error validating invitation",
      error,
    });
  }
};
