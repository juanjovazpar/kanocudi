export const generateKanoQuestion = (
  featureName: string,
  isPositive: boolean = true
): string => {
  const positiveQuestionTemplate = `How satisfied are you with the ${featureName}?`;
  const negativeQuestionTemplate = `How would you feel if the ${featureName} were missing or had issues?`;

  return isPositive ? positiveQuestionTemplate : negativeQuestionTemplate;
};
