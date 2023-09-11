import mongoose, { Document, Schema, Model } from "mongoose";

interface IInvitation extends Document {
  product: mongoose.Types.ObjectId;
  email: string;
  token?: string;
  sent_date?: Date;
  response?: mongoose.Types.ObjectId;
}

const invitationSchema: Schema<IInvitation> = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  sent_date: {
    type: Date,
  },
  response: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Response",
  },
});

const Invitation: Model<IInvitation> = mongoose.model<IInvitation>(
  "Invitation",
  invitationSchema
);

export { Invitation, IInvitation };
