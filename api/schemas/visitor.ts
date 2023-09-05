import mongoose, { Document, Schema, Model } from "mongoose";

interface IVisitor extends Document {
  email?: string;
  random_number: string;
}

const visitorSchema: Schema<IVisitor> = new Schema({
  email: String,
  random_number: String,
});

const Visitor: Model<IVisitor> = mongoose.model<IVisitor>(
  "Visitor",
  visitorSchema
);

export { Visitor, IVisitor };
