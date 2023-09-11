import { Request, Response } from "express";
import { isValidEmail } from "../utils/isValidEmail";
import { IInvitation, Invitation } from "../schemas/invitation";
import { RequestProduct } from "../middlewares/productOwnership";
import { getHashedToken } from "../utils/tokenGenerator";

export const createInvitationInProduct = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const product = (req as RequestProduct).product;
    const { email } = req.body;

    if (!isValidEmail(email)) {
      res.status(400).json({ message: "Invalid email format" });
      return;
    }

    const invitationEmails = (
      product.invitations as unknown as IInvitation[]
    ).map((invitation) => invitation?.email);

    if (invitationEmails.includes(email)) {
      res.status(404).json({ message: "Email already invited" });
      return;
    }

    const invitation = new Invitation({
      email,
      product: product._id,
      token: await getHashedToken(20 * 24 * 60 * 60 * 1000),
    });

    await invitation.save();

    product.invitations.push(invitation._id);

    await product.save();

    const updatedProduct = await product.populate([
      { path: "features", select: "-product -__v" },
      { path: "invitations", select: "-product -__v" },
    ]);

    res.status(201).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error creating invitation", error });
  }
};
