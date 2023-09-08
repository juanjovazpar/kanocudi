import { Request, Response } from "express";
import { RequestAuth } from "../middlewares/authToken";
import { FeatureCategory } from "../schemas/featureCategory";
import { ProductStatus } from "../schemas/productStatus";

export const getLoggedUser = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { email, name } = (req as RequestAuth).user;
    const statuses = await ProductStatus.find();
    const categories = await FeatureCategory.find();

    res
      .status(200)
      .json({ email, name, initialConfig: { statuses, categories } });
  } catch (error) {
    res.status(500).json({
      message: "User not found",
      error,
    });
  }
};
