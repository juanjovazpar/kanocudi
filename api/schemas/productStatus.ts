import mongoose, { Document, Schema, Model } from "mongoose";

interface IProductStatus extends Document {
  name: string;
  description: string;
}

const productStatusSchema: Schema<IProductStatus> = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const ProductStatus: Model<IProductStatus> = mongoose.model<IProductStatus>(
  "ProductStatus",
  productStatusSchema
);

export { ProductStatus, IProductStatus };
