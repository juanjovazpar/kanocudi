import { Request, Response } from "express";
import { Product } from "../schemas/product";
import { RequestProduct } from "../middlewares/productOwnership";
import { sendInvitationMail } from "../mailer/sendInvitation";
import { IInvitation } from "../schemas/invitation";
import { getHashedToken } from "../utils/tokenGenerator";

export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = (req as RequestProduct).product;

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving product", error });
  }
};

export const updateProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { _id } = (req as RequestProduct).product;
    const { name, description } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      _id,
      { name, description },
      { new: true }
    ).populate([
      { path: "features", select: "-product_id -__v" },
      { path: "invitations", select: "-product_id -__v" },
    ]);

    if (!updatedProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

export const deleteProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { _id } = (req as RequestProduct).product;
    const deletedProduct = await Product.findByIdAndRemove(_id);

    if (!deletedProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(204).json(deletedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};

export const getProductResultsById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = (req as RequestProduct).product;

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving product", error });
  }
};

export const sendInvitationsByProductId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let product = (req as RequestProduct).product;

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    const date = new Date();
    const mailPromises = product.invitations
      .filter((invitation) => !(invitation as unknown as IInvitation).sent_date)
      .map(async (data) => {
        try {
          const invitation = data as unknown as IInvitation;
          const token = invitation?.token;

          if (!token) {
            invitation.token = await getHashedToken(20 * 24 * 60 * 60 * 1000);
          }

          // await sendInvitationMail(invitation.email, invitation.token);

          invitation.sent_date = date;
          await invitation.save();
        } catch (error) {
          console.error(`Error processing invitation: ${error}`);
        }
      });

    await Promise.all(mailPromises);

    await product.populate([
      { path: "features", select: "-product_id -__v -questionaries" },
      { path: "invitations", select: "-product_id -__v" },
    ]);

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving product", error });
  }
};
