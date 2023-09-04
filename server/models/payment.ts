import mongoose, { Document, Schema, Model } from "mongoose";

interface IPayment extends Document {
  user_id: mongoose.Types.ObjectId;
  product_id: mongoose.Types.ObjectId;
  amount: number;
  payment_date: Date;
  payment_status: string;
}

const paymentSchema: Schema<IPayment> = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  payment_date: {
    type: Date,
    required: true,
  },
  payment_status: {
    type: String,
    required: true,
  },
});

const Payment: Model<IPayment> = mongoose.model<IPayment>(
  "Payment",
  paymentSchema
);

export { Payment, IPayment };
