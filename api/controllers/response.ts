import { Request, Response } from "express";
import { RequestProduct } from "../middlewares/productOwnership";
import { Product } from "../schemas/product";

export const getResponseByInvitationToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = (req as RequestProduct).product;

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    const questionary = await Product.findById(product._id)
      .select(["-owner", "-_id", "-invitations", "-status"])
      .populate([
        {
          path: "features",
          select: ["-product_id", "-questionaries"],
        },
      ]);

    res.status(200).json(questionary);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving questionary", error });
  }
};

export const responseByInvitationToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.status(200).json({ message: "Thank you" });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving questionary", error });
  }
};
