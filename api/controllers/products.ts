import { Request, Response } from "express";
import { Product } from "../schemas/product";
import { RequestAuth } from "../middlewares/authToken";

export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as RequestAuth).user._id;

    const products = await Product.find({ owner: userId });
    /* TODO: Populate features and invitations:
      .populate("features")
      .populate("invitations");
    */

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving products", error });
  }
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as RequestAuth).user._id;
    const { name, description } = req.body;

    const newProduct = new Product({
      name,
      description,
      owner: userId,
      features: [],
      invitations: [],
    });

    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
};

export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const productId = req.params.product_id;

    const product = await Product.findById(productId);
    /* TODO: Populate features and invitations:
      .populate("features")
      .populate("invitations");
    */

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
    const productId = req.params.product_id;
    const { name, description } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, description },
      { new: true }
    );
    /* TODO: Populate features and invitations:
      .populate("features")
      .populate("invitations");
    */

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
    const productId = req.params.product_id;

    const deletedProduct = await Product.findByIdAndRemove(productId);

    if (!deletedProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};
