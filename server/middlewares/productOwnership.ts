import { Request, Response, NextFunction } from "express";

export const productOwnershipMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const productId: string | undefined = req.params.productId;

  if (!productId) {
    return res
      .status(400)
      .json({ message: "Product ID is missing in the URL" });
  }

  try {
    const product: IProduct | null = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const loggedInUserId: string = req.user._id.toString();

    if (product.userId !== loggedInUserId) {
      return res
        .status(403)
        .json({ message: "You do not have permission to access this product" });
    }

    req.product = product;

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Error validating product ownership",
      error: error.message,
    });
  }
};
