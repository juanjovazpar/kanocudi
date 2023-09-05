import mongoose, { Document, Schema, Model } from "mongoose";
import { IProductStatus, ProductStatus } from "./productStatus"; // Import the ProductStatus interface

interface IProduct extends Document {
  name: string;
  status: IProductStatus["_id"];
  user_id: mongoose.Types.ObjectId;
  features: mongoose.Types.ObjectId[];
  invitations: mongoose.Types.ObjectId[];
  description?: string;
}

const productSchema: Schema<IProduct> = new Schema({
  name: { type: String, required: true },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductStatus",
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  features: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Feature",
      default: [],
    },
  ],
  invitations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Feature",
      default: [],
    },
  ],
  description: String,
});

productSchema.pre<IProduct>("save", async function (next) {
  try {
    const statusName = this.status; // Assuming statusName is passed as a string

    // Check if the status already exists
    let existingStatus = await ProductStatus.findOne({
      name: statusName,
    }).exec();

    // If the status doesn't exist, create it
    if (!existingStatus) {
      existingStatus = await ProductStatus.create({ name: statusName });
    }

    // Assign the existing or new status to the product
    this.status = existingStatus._id;

    next();
  } catch (error) {
    next(error);
  }
});

const Product: Model<IProduct> = mongoose.model<IProduct>(
  "Product",
  productSchema
);

export { Product, IProduct };
