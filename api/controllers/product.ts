import { Request, Response } from "express";
import { Product } from "../schemas/product";
import { RequestProduct } from "../middlewares/productOwnership";

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

    res.status(204).send().json(deletedProduct);
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
