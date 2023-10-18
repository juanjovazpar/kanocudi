import {
  ATRACTIVE,
  INDIFFERENT,
  MUST_BE,
  PERFORMANCE,
  REVERSE,
} from "../db/createFeatureCategories";
import { IAnswer } from "../db/schemas/answer";

export const getFeatureCategory = (answer: IAnswer): string => {
  const { positive_answer, negative_answer } = answer;

  if (positive_answer === 0 && negative_answer === 0) {
    return MUST_BE;
  } else if (positive_answer > 0 && negative_answer === 0) {
    return PERFORMANCE;
  } else if (positive_answer === 0 && negative_answer > 0) {
    return REVERSE;
  } else if (positive_answer === 0 && negative_answer === 0) {
    return INDIFFERENT;
  } else {
    return ATRACTIVE;
  }
};
