import mongoose, { Document, Schema, Model, CallbackError } from "mongoose";
import { IProductStatus, ProductStatus } from "./productStatus"; // Import the ProductStatus interface

interface IProduct extends Document {
  name: string;
  status: IProductStatus["_id"];
  user: mongoose.Types.ObjectId;
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
  user: {
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
      ref: "Invitation",
      default: [],
    },
  ],
  description: String,
});

productSchema.pre<IProduct>("save", async function (next) {
  try {
    const statusName = this.status;

    let existingStatus = await ProductStatus.findOne({
      name: statusName,
    }).exec();

    if (!existingStatus) {
      existingStatus = await ProductStatus.create({ name: statusName });
    }

    this.status = existingStatus._id;

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
