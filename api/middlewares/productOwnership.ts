import { Request, Response, NextFunction } from "express";
import { IProduct, Product } from "../db/schemas/product";
import { RequestAuth } from "./authToken";

export interface RequestProduct extends RequestAuth {
  product: IProduct;
}

export const productOwnershipMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { product_id } = req?.params;

    if (!product_id) {
      res.status(400).json({ message: "Product ID is missing in the URL" });
      return;
    }

    const product: IProduct | null = await Product.findById(
      product_id
    ).populate([
      { path: "features", select: "-product -__v -questionaries" },
      { path: "invitations", select: "-product -__v" },
    ]);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    const loggedInUserId: string = (req as RequestAuth).user._id.toString();

    if (product.owner._id.toString() !== loggedInUserId) {
      res.status(403).json({
        message: "You do not have permission to access this product",
      });
      return;
    }

    (req as RequestProduct).product = product;

    next();
  } catch (error) {
    res.status(500).json({
      message: "Error validating product ownership",
      error,
    });
    return;
  }
};
