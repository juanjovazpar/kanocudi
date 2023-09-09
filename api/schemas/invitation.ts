import mongoose, { Document, Schema, Model, CallbackError } from "mongoose";
import { getHashedToken } from "../utils/tokenGenerator";

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

invitationSchema.pre<IInvitation>("save", async function (next) {
  try {
    if (!this.token) {
      this.token = await getHashedToken(20 * 24 * 60 * 60 * 1000);
    }

    next();
  } catch (error) {
    next(error as CallbackError);
  }
});

export { Invitation, IInvitation };
