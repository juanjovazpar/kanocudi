import mongoose, { Document, Schema, Model, CallbackError } from "mongoose";
import { ProductStatus } from "./productStatus"; // Import the ProductStatus interface
import { DRAFT_STATUS } from "../db/createProductStatuses";

interface IProduct extends Document {
  name: string;
  status: mongoose.Types.ObjectId;
  owner: mongoose.Types.ObjectId;
  features: mongoose.Types.ObjectId[];
  invitations: mongoose.Types.ObjectId[];
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
  description: String,
});

productSchema.pre<IProduct>("save", async function (next) {
  try {
    const statusId = this.status;

    let existingStatus = await ProductStatus.findById(statusId);

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
