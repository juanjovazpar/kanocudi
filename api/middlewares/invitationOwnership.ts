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
    const { invitationId } = req?.params;

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (
      !product.invitations
        .map((invitation) => invitation?._id?.toString())
        .includes(invitationId)
    ) {
      return res.status(403).json({
        message: "This invitation doesn't belong to the product.",
      });
    }

    const invitation: IInvitation | null = await Invitation.findById(
      invitationId
    );

    if (!invitation) {
      return res.status(404).json({ message: "Invitation not found" });
    }

    (req as RequestInvitation).invitation = invitation;

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Error validating invitation ownership",
      error,
    });
  }
};
