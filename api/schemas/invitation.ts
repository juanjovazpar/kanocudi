import mongoose, { Document, Schema, Model } from "mongoose";

interface IInvitation extends Document {
  product_id: mongoose.Types.ObjectId;
  email: string;
  token: string;
  sent_date?: Date;
}

const invitationSchema: Schema<IInvitation> = new Schema({
  product_id: {
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
    required: true,
  },
  sent_date: {
    type: Date,
  },
});

const Invitation: Model<IInvitation> = mongoose.model<IInvitation>(
  "Invitation",
  invitationSchema
);

export { Invitation, IInvitation };
