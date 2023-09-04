import mongoose, { Document, Schema, Model } from "mongoose";

// Define the FeatureCategory interface for TypeScript
interface IFeatureCategory extends Document {
  name: string;
  description: string;
}

// Define the FeatureCategory schema
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

// Create a FeatureCategory model from the schema
const FeatureCategory: Model<IFeatureCategory> =
  mongoose.model<IFeatureCategory>("FeatureCategory", featureCategorySchema);

export { FeatureCategory, IFeatureCategory };
