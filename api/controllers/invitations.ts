import { Request, Response } from "express";
import { Product } from "../schemas/product";

export const createInvitationInProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const productId = req.params.product_id;
    // const { email } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    // TODO: Add email to invitations
    // product.invitations.push({ email });
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error creating invitation" });
  }
};

export const updateInvitationInProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const productId = req.params.product_id;
    // const invitationId = req.params.invitation_id;
    // const { email } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    // TODO: Update invitation in product
    // const invitation = product.invitations.id(invitationId);

    //if (!invitation) {
    //  res.status(404).json({ message: "Invitation not found" });
    //  return;
    //}

    // invitation.email = email;
    await product.save();

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error updating invitation" });
  }
};

export const deleteInvitationFromProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const productId = req.params.product_id;
    // const invitationId = req.params.invitation_id;

    const product = await Product.findById(productId);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    // TODO: Remove invitation
    // product.invitations.pull(invitationId);
    await product.save();

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error deleting invitation" });
  }
};
