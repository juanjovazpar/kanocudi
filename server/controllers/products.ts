import { Request, Response } from "express";
import { Product } from "../models/product";

export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user._id;

    const products = await Product.find({ owner: userId })
      .populate("features")
      .populate("invitations");

    res.status(200).json(products);
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).json({ message: "Error retrieving products" });
  }
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user._id;
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
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Error creating product" });
  }
};

export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const productId = req.params.product_id;

    const product = await Product.findById(productId)
      .populate("features")
      .populate("invitations");

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error retrieving product:", error);
    res.status(500).json({ message: "Error retrieving product" });
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
    )
      .populate("features")
      .populate("invitations");

    if (!updatedProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Error updating product" });
  }
};

export const deleteProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const productId = req.params.product_id; // Assuming you use product_id as the parameter name

    // Delete the product by ID (or slug)
    const deletedProduct = await Product.findByIdAndRemove(productId);

    if (!deletedProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(204).send(); // Send a "No Content" response for successful deletion
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Error deleting product" });
  }
};
