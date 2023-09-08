import { Request, Response } from "express";
import { Product } from "../schemas/product";
import { isValidEmail } from "../utils/isValidEmail";
import { IInvitation, Invitation } from "../schemas/invitation";

export const createInvitationInProduct = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const productId = req.params.product_id;
    const { email } = req.body;

    const product = await Product.findById(productId).populate([
      { path: "invitations", select: "-product_id -__v" },
    ]);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const invitationEmails = (
      product.invitations as unknown as IInvitation[]
    ).map((invitation) => invitation?.email);

    if (invitationEmails.includes(email)) {
      return res.status(404).json({ message: "Email already invited" });
    }

    const invitation = new Invitation({
      email,
      product_id: product._id,
    });

    await invitation.save();

    product.invitations.push(invitation._id);

    await product.save();

    const updatedProduct = await product.populate([
      { path: "features", select: "-product_id -__v" },
      { path: "invitations", select: "-product_id -__v" },
    ]);

    res.status(201).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error creating invitation" });
  }
};

export const updateInvitationInProduct = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const productId = req.params.product_id;
    const invitationId = req.params.invitation_id;
    const { email } = req.body;

    const product = await Product.findById(productId).populate([
      { path: "invitations", select: "-product_id -__v" },
    ]);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const invitation = await Invitation.findById(invitationId);

    if (!invitation) {
      return res.status(404).json({ message: "Invitation not found" });
    }

    if (
      product.invitations.map((invitation) => invitation?.email).includes(email)
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
    const productId = req.params.product_id;
    const invitationId = req.params.invitation_id;

    const product = await Product.findById(productId).populate([
      { path: "features", select: "-product_id -__v" },
      { path: "invitations", select: "-product_id -__v" },
    ]);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const invitation = await Invitation.findById(invitationId);

    if (!invitation) {
      return res.status(404).json({ message: "Invitation not found" });
    }

    invitation.deleteOne();

    const invitations = product.invitations.filter(
      (id) => !id.equals(invitationId)
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
