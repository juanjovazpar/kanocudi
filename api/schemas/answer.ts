import mongoose, { Document, Schema, Model } from "mongoose";

interface IAnswer extends Document {
  response: mongoose.Types.ObjectId;
  feature: mongoose.Types.ObjectId;
  positive_answer: Number;
  negative_answer: Number;
}

const answerSchema: Schema<IAnswer> = new Schema({
  response: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Response",
    required: true,
  },
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
