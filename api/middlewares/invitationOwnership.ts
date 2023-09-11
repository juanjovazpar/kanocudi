import { Request, Response, NextFunction } from "express";
import { IInvitation, Invitation } from "../schemas/invitation";
import { RequestProduct } from "./productOwnership";

export interface RequestInvitation extends RequestProduct {
  invitation: IInvitation;
}

export const invitationOwnershipMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const product = (req as RequestProduct).product;
    const { invitation_id } = req?.params;

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    if (
      !invitation_id ||
      !product.invitations
        .map((invitation) => invitation?._id?.toString())
        .includes(invitation_id)
    ) {
      res.status(403).json({
        message: "This invitation doesn't belong to the product.",
      });
      return;
    }

    const invitation: IInvitation | null = await Invitation.findById(
      invitation_id
    );

    if (!invitation) {
      res.status(404).json({ message: "Invitation not found" });
      return;
    }

    (req as RequestInvitation).invitation = invitation;

    next();
  } catch (error) {
    res.status(500).json({
      message: "Error validating invitation ownership",
      error,
    });
    return;
  }
};
