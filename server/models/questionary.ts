import mongoose, { Document, Schema, Model } from "mongoose";

interface IQuestionary extends Document {
  visitor_id: mongoose.Types.ObjectId;
  feature_id: mongoose.Types.ObjectId;
  responses: mongoose.Types.ObjectId[];
}

const questionarySchema: Schema<IQuestionary> = new Schema({
  visitor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Visitor",
    required: true,
  },
  feature_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Feature",
    required: true,
  },
  responses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Response",
    },
  ],
});

questionarySchema.index({ visitor_id: 1, feature_id: 1 }, { unique: true });

const Questionary: Model<IQuestionary> = mongoose.model<IQuestionary>(
  "Questionary",
  questionarySchema
);

export { Questionary, IQuestionary };
