import mongoose, { Document, Schema, Model, CallbackError } from "mongoose";
import { getFeatureCategory } from "../utils/featureCategory";
import { FeatureCategory } from "./featureCategory";

interface IAnswer extends Document {
  feature: mongoose.Types.ObjectId;
  category: mongoose.Types.ObjectId;
  positive_answer: number;
  negative_answer: number;
}

const answerSchema: Schema<IAnswer> = new Schema({
  feature: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Feature",
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FeatureCategory",
  },
  positive_answer: {
    type: Number,
    required: true,
  },
  negative_answer: {
    type: Number,
    required: true,
  },
});

answerSchema.pre<IAnswer>("save", async function (next) {
  try {
    const category = getFeatureCategory(this);

    let existingStatus = await FeatureCategory.findOne({ name: category });

    if (!existingStatus) {
      existingStatus = await FeatureCategory.findOne({ name: category });
    }

    this.category = existingStatus?._id;

    next();
  } catch (error) {
    next(error as CallbackError);
  }
});

const Answer: Model<IAnswer> = mongoose.model<IAnswer>("Answer", answerSchema);

export { Answer, IAnswer };
