import mongoose, { Document, Schema, Model } from "mongoose";

interface IAnswer extends Document {
  feature: mongoose.Types.ObjectId;
  positive_answer: number;
  negative_answer: number;
}

const answerSchema: Schema<IAnswer> = new Schema({
  feature: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Feature",
    required: true,
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

const Answer: Model<IAnswer> = mongoose.model<IAnswer>("Answer", answerSchema);

export { Answer, IAnswer };
