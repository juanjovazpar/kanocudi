import { Request, NextFunction, Response } from "express";
import { IInvitation, Invitation } from "../schemas/invitation";
import { IProduct, Product } from "../schemas/product";
import { RequestProduct } from "./productOwnership";

export interface RequestInvitation extends Request {
  invitation: IInvitation;
}

export const invitationTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { invitationToken } = req.params;

  try {
    const invitation = await Invitation.findOne({ token: invitationToken });

    if (!invitation) {
      return res.status(401).json({ message: "Invalid invitation token" });
    }

    const product: IProduct | null = await Product.findById(
      invitation.product_id
    ).populate([{ path: "features", select: "-product_id -__v" }]);

    if (!product) {
      return res.status(401).json({ message: "Product not found" });
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