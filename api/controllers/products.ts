import { Request, Response } from "express";
import { Product } from "../schemas/product";
import { RequestAuth } from "../middlewares/authToken";
import { Feature, IFeature } from "../schemas/feature";
import { IInvitation, Invitation } from "../schemas/invitation";
import { isValidEmail } from "../utils/isValidEmail";

export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as RequestAuth).user._id;

    const products = await Product.find({ owner: userId }).populate([
      { path: "features", select: "-product_id -__v" },
      { path: "invitations", select: "-product_id -__v" },
    ]);

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
    const { name, description, features, invitations } = req.body;

    const newProduct = new Product({
      name,
      description,
      owner: userId,
      features: [],
      invitations: [],
    });

    const newFeaturesPromises = features
      ?.filter((featureData: IFeature) => featureData?.name)
      .map(async (featureData: IFeature) => {
        const { name, description, positive_question, negative_question } =
          featureData;

        const feature = new Feature({
          name,
          description,
          positive_question,
          negative_question,
          product_id: newProduct._id,
        });

        await feature.save();
        return feature._id;
      });

    const newInvitationsPromises = invitations
      ?.filter(
        (invitationData: IInvitation) =>
          invitationData?.email && isValidEmail(invitationData.email)
      )
      .map(async (invitationData: IInvitation) => {
        const { email } = invitationData;

        const invitation = new Invitation({
          email,
          product_id: newProduct._id,
        });

        await invitation.save();
        return invitation._id;
      });

    newProduct.features = await Promise.all(newFeaturesPromises);
    newProduct.invitations = await Promise.all(newInvitationsPromises);

    await newProduct.save();

    const populatedProduct = await newProduct.populate({
      path: "features",
      select: "-product_id -__v",
    });

    res.status(201).json(populatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
};
