import { FeatureCategory } from "../schemas/featureCategory";

const featureCategoriesData: any[] = [
  {
    name: "must-be",
    description: `Essential features that must be present:
      Customers expect these features to be present.
      Their absence would lead to dissatisfaction.
      When present, they don't necessarily create excitement, but their absence is a significant source of dissatisfaction.
      Responses: Expected, not noticed when present, causes dissatisfaction when absent.`,
  },
  {
    name: "one-dimensional",
    description: `Features where quality is linearly related to satisfaction.
      These are features that directly correlate with satisfaction.
      The better these features are, the more satisfied the customers are.
      Their absence doesn't necessarily lead to dissatisfaction, but their presence increases satisfaction.
      Responses: Linear relationship between feature quality and satisfaction.`,
  },
  {
    name: "attractive",
    description: `Features that delight and surprise customers.
      Their presence can lead to increased satisfaction and loyalty.
      Their absence doesn't necessarily cause dissatisfaction; customers may not expect them.
      Responses: Delight, excitement when present, no dissatisfaction when absent.`,
  },
  {
    name: "indifferent",
    description: `Features that don't significantly impact satisfaction.
      These are features that customers neither care about nor are dissatisfied with when they are absent.
      They have little impact on overall satisfaction.
      Responses: Neutral, no strong feelings either way.`,
  },
  {
    name: "reverse",
    description: `Features that can lead to dissatisfaction when present.
      Features that, when present, lead to dissatisfaction.
      Customers prefer these features to be absent.
      Their presence can be surprising and negatively impact satisfaction.
      Responses: Dissatisfaction when present, satisfaction when absent.`,
  },
];

export async function createInitialFeatureCategories() {
  try {
    const existingCategories = await FeatureCategory.find({
      name: { $in: featureCategoriesData.map((category) => category.name) },
    });

    const newCategories = featureCategoriesData.filter(
      (category) =>
        !existingCategories.some(
          (existingCategory) => existingCategory.name === category.name
        )
    );

    if (newCategories.length === 0) {
      console.log("All categories already exist.");
      return;
    }

    const createdCategories = await FeatureCategory.insertMany(newCategories);

    console.log("Feature categories created:", createdCategories);
  } catch (error) {
    console.error("Error creating feature categories:", error);
  }
}
