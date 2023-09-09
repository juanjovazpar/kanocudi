import { Request, Response } from "express";
import { isValidEmail } from "../utils/isValidEmail";
import { IInvitation } from "../schemas/invitation";
import { RequestProduct } from "../middlewares/productOwnership";
import { RequestInvitation } from "../middlewares/invitationOwnership";

export const updateInvitationInProduct = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const product = (req as RequestProduct).product;
    const invitation = (req as RequestInvitation).invitation;
    const { email } = req.body;

    if (
      product.invitations
        .map((invitation) => (invitation as unknown as IInvitation)?.email)
        .includes(email)
    ) {
      return res.status(400).json({ message: "Email already invited" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    invitation.email = email;

    await invitation.save();

    const updatedProduct = await product.populate([
      { path: "features", select: "-product_id -__v" },
      { path: "invitations", select: "-product_id -__v" },
    ]);

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error updating invitation" });
  }
};

export const deleteInvitationFromProduct = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const product = (req as RequestProduct).product;
    const invitation = (req as RequestInvitation).invitation;

    invitation.deleteOne();

    const invitations = product.invitations.filter(
      (id) => !id.equals(invitation._id)
    );
    product.invitations = invitations;

    await product.save();

    const updatedProduct = await product.populate([
      { path: "features", select: "-product_id -__v" },
      { path: "invitations", select: "-product_id -__v" },
    ]);

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error deleting invitation" });
  }
};
