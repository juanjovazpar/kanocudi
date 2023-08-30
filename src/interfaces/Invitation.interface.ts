import { IAnswer } from "./Answer.interface";

export interface IInvitation {
  email: string;
  answer?: IAnswer;
}
