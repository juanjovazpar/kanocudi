import mongoose, { Document, Schema, Model } from "mongoose";

interface IResponse extends Document {
  questionary_id: mongoose.Types.ObjectId;
  question_id: "positive" | "negative";
  answer: string;
}

const responseSchema: Schema<IResponse> = new Schema({
  questionary_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Questionary",
    required: true,
  },
  question_id: { type: String, required: true },
  answer: { type: String, required: true },
});

const Response: Model<IResponse> = mongoose.model<IResponse>(
  "Response",
  responseSchema
);

export { Response, IResponse };
