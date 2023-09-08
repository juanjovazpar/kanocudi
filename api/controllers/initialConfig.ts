import { Request, Response } from "express";
import { ProductStatus } from "../schemas/productStatus";
import { FeatureCategory } from "../schemas/featureCategory";

export const getInitialConfig = async (
  _: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const statuses = await ProductStatus.find();
    const categories = await FeatureCategory.find();

    res.status(200).json({ statuses, categories });
  } catch (error) {
    res.status(500).json({
      message: "Error getting initial configuration",
      error,
    });
  }
};
