import mongoose, { Document, Schema, Model, CallbackError } from "mongoose";

interface IQuestionaryResponse extends Document {
  product: mongoose.Types.ObjectId;
  answers: mongoose.Types.ObjectId[];
  invitation?: mongoose.Types.ObjectId;
  creation_date: Date;
}

const questionaryResponseSchema: Schema<IQuestionaryResponse> = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer",
      required: true,
    },
  ],
  invitation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Invitation",
  },
  creation_date: {
    type: Date,
  },
});

questionaryResponseSchema.pre<IQuestionaryResponse>(
  "save",
  async function (next) {
    try {
      if (!this.creation_date) {
        this.creation_date = new Date();
      }

      next();
    } catch (error) {
      next(error as CallbackError);
    }
  }
);

const QuestionaryResponse: Model<IQuestionaryResponse> =
  mongoose.model<IQuestionaryResponse>(
    "QuestionaryResponse",
    questionaryResponseSchema
  );

export { QuestionaryResponse, IQuestionaryResponse };
