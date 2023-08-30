import { ANSWER } from "../enums/answers.enum";
import { IAnswer } from "../interfaces/Answer.interface";

export const ANSWERS: IAnswer[] = [
  {
    feature_1: ANSWER.LIKED,
    feature_3: ANSWER.EXPECTED,
    feature_5: ANSWER.TOLERATE,
    feature_8: ANSWER.DISLIKE,
  },
  {
    feature_2: ANSWER.LIKED,
    feature_4: ANSWER.EXPECTED,
    feature_6: ANSWER.TOLERATE,
    feature_9: ANSWER.DISLIKE,
  },
  {
    feature_1: ANSWER.EXPECTED,
    feature_5: ANSWER.LIKED,
    feature_7: ANSWER.DISLIKE,
    feature_10: ANSWER.EXPECTED,
  },
  {
    feature_3: ANSWER.LIKED,
    feature_6: ANSWER.EXPECTED,
    feature_8: ANSWER.TOLERATE,
    feature_9: ANSWER.TOLERATE,
  },
  {
    feature_2: ANSWER.EXPECTED,
    feature_4: ANSWER.LIKED,
    feature_6: ANSWER.DISLIKE,
    feature_10: ANSWER.TOLERATE,
  },
  {
    feature_1: ANSWER.DISLIKE,
    feature_3: ANSWER.EXPECTED,
    feature_5: ANSWER.LIKED,
    feature_7: ANSWER.TOLERATE,
  },
  {
    feature_2: ANSWER.EXPECTED,
    feature_4: ANSWER.DISLIKE,
    feature_8: ANSWER.LIKED,
    feature_9: ANSWER.NEUTRAL,
  },
  {
    feature_3: ANSWER.DISLIKE,
    feature_6: ANSWER.TOLERATE,
    feature_7: ANSWER.EXPECTED,
    feature_10: ANSWER.LIKED,
  },
  {
    feature_2: ANSWER.TOLERATE,
    feature_5: ANSWER.EXPECTED,
    feature_7: ANSWER.LIKED,
    feature_9: ANSWER.DISLIKE,
  },
  {
    feature_1: ANSWER.LIKED,
    feature_4: ANSWER.TOLERATE,
    feature_8: ANSWER.EXPECTED,
    feature_10: ANSWER.NEUTRAL,
  },
];
