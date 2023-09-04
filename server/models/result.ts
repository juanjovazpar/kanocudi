import mongoose, { Document, Schema, Model } from "mongoose";

interface IResultAccess extends Document {
  user_id: mongoose.Types.ObjectId;
  payment_id: mongoose.Types.ObjectId;
  accessed: boolean;
}

const resultAccessSchema: Schema<IResultAccess> = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  payment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment",
    required: true,
  },
  accessed: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const ResultAccess: Model<IResultAccess> = mongoose.model<IResultAccess>(
  "ResultAccess",
  resultAccessSchema
);

export { ResultAccess, IResultAccess };
