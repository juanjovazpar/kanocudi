import { Response, NextFunction } from "express";
import { IProduct, Product } from "../schemas/product";
import { RequestAuth } from "./authToken";

export interface RequestProduct extends RequestAuth {
  product: IProduct;
}

export const productOwnershipMiddleware = async (
  req: RequestProduct,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const productId: string | undefined = req.params.productId;

    if (!productId) {
      return res
        .status(400)
        .json({ message: "Product ID is missing in the URL" });
    }

    const product: IProduct | null = await Product.findById(productId).populate(
      [
        { path: "features", select: "-product_id -__v" },
        { path: "invitations", select: "-product_id -__v" },
      ]
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const loggedInUserId: string = req.user._id.toString();

    if (product.owner._id.toString() !== loggedInUserId) {
      return res.status(403).json({
        message: "You do not have permission to access this product",
      });
    }

    req.product = product;

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Error validating product ownership",
      error,
    });
  }
};
