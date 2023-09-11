import mongoose, { Document, Schema, Model, CallbackError } from "mongoose";
import { ProductStatus } from "./productStatus"; // Import the ProductStatus interface
import { DRAFT_STATUS } from "../db/createProductStatuses";
import { getProductStatus } from "../utils/productCategory";

interface IProduct extends Document {
  name: string;
  status: mongoose.Types.ObjectId;
  owner: mongoose.Types.ObjectId;
  features: mongoose.Types.ObjectId[];
  invitations: mongoose.Types.ObjectId[];
  responses: mongoose.Types.ObjectId[];
  description?: string;
}

const productSchema: Schema<IProduct> = new Schema({
  name: { type: String, required: true },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductStatus",
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  features: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Feature",
    },
  ],
  invitations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invitation",
    },
  ],
  responses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Response",
    },
  ],
  description: String,
});

productSchema.pre<IProduct>("save", async function (next) {
  try {
    const status = getProductStatus(this);

    let existingStatus = await ProductStatus.findOne({ name: status });

    if (!existingStatus) {
      existingStatus = await ProductStatus.findOne({ name: DRAFT_STATUS });
    }

    this.status = existingStatus?._id;

    next();
  } catch (error) {
    next(error as CallbackError);
  }
});

const Product: Model<IProduct> = mongoose.model<IProduct>(
  "Product",
  productSchema
);

export { Product, IProduct };
