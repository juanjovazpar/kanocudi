import mongoose, { Document, Schema, Model } from "mongoose";

interface IFeatureCategory extends Document {
  name: string;
  description: string;
}

const featureCategorySchema: Schema<IFeatureCategory> = new Schema({
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

const FeatureCategory: Model<IFeatureCategory> =
  mongoose.model<IFeatureCategory>("FeatureCategory", featureCategorySchema);

export { FeatureCategory, IFeatureCategory };
