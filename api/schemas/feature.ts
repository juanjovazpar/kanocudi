import mongoose, { Document, Schema, Model, CallbackError } from "mongoose";
import { IFeatureCategory } from "./featureCategory";
import { getKanoQuestion } from "../utils/questionGenerator";

interface IFeature extends Document {
  product: mongoose.Types.ObjectId;
  name: string;
  positive_question: string;
  negative_question: string;
  category?: IFeatureCategory["_id"];
  description?: string;
}

const featureSchema: Schema<IFeature> = new Schema({
  description: String,
  name: {
    type: String,
    required: true,
  },
  positive_question: {
    type: String,
    required: true,
    default: "Default Positive Question",
  },
  negative_question: {
    type: String,
    required: true,
    default: "Default Negative Question",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FeatureCategory",
  },
});

featureSchema.index({ name: 1, product: 1 }, { unique: true });

featureSchema.pre<IFeature>("save", async function (next) {
  try {
    if (this.positive_question) {
      this.positive_question = getKanoQuestion(this.name);
    }

    if (this.negative_question) {
      this.negative_question = getKanoQuestion(this.name, false);
    }

    next();
  } catch (error) {
    next(error as CallbackError);
  }
});

const Feature: Model<IFeature> = mongoose.model<IFeature>(
  "Feature",
  featureSchema
);

export { Feature, IFeature };
