import { Request, Response } from "express";
import { RequestProduct } from "../middlewares/productOwnership";
import { IProduct, Product } from "../schemas/product";
import { RequestInvitation } from "../middlewares/invitationOwnership";
import { IQuestionaryResponse, QuestionaryResponse } from "../schemas/response";
import { Answer, IAnswer } from "../schemas/answer";
import { IFeature } from "../schemas/feature";

export const getResponseByInvitationToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = (req as RequestProduct).product;

    if (!product) {
      res.status(404).json({ message: "Product not found" });
    } else {
      const questionary = await Product.findById(product._id)
        .select(["-owner", "-_id", "-invitations", "-status"])
        .populate([
          {
            path: "features",
            select: ["-product", "-questionaries"],
          },
        ]);

      res.status(200).json(questionary);
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving questionary", error });
  }
};

export const responseByInvitationToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { product, invitation } = req as RequestInvitation;
    const answers: IAnswer[] = req.body?.response;

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    if (!product.features) {
      res.status(404).json({ message: "Features not found" });
      return;
    }

    if (!invitation) {
      res.status(404).json({ message: "Invitation not found" });
      return;
    }

    const featuresIds: string[] = (
      product.features as unknown as IFeature[]
    ).map((feature: IFeature) => feature?._id.toString());
    const answersObject: { [key: string]: IAnswer } = answers
      .filter(
        (
          answer: IAnswer // All properties must exist and answer must be related with an existing feature
        ) =>
          answer.positive_answer != null &&
          answer.positive_answer >= 0 &&
          answer.positive_answer < 5 &&
          answer.negative_answer != null &&
          answer.negative_answer >= 0 &&
          answer.negative_answer < 5 &&
          answer.feature != null &&
          featuresIds.includes(answer.feature.toString())
      )
      .reduce(
        (acc: { [key: string]: IAnswer }, cur: IAnswer) => ({
          ...acc,
          [cur?.feature?.toString()]: cur,
        }),
        {} as { [key: string]: IAnswer }
      );

    const answerComplete: boolean = featuresIds.reduce(
      (acc: boolean, id: string) => acc && !!answersObject[id],
      true
    );

    if (!answerComplete) {
      res.status(404).json({
        message:
          "Some features aren't answer. Please complete the questionary properly",
      });
      return;
    }

    const answersToCreate = Object.values(answersObject);
    await Answer.create(answersToCreate);

    const answersIds = Object.keys(answersObject);
    const newResponse: IQuestionaryResponse = new QuestionaryResponse({
      product: product._id,
      invitation: invitation._id,
      answers: answersIds,
    });

    await newResponse.save();

    invitation.token = undefined;
    invitation.response = newResponse._id;
    await invitation.save();

    (product as unknown as IProduct).responses.push(newResponse._id);
    await product.save();

    res.status(200).json({ message: "Thank you for replying!" });
  } catch (error) {
    res.status(500).json({ message: "Error sending response", error });
  }
};
