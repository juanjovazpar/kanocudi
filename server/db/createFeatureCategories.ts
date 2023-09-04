import { FeatureCategory } from "../models/featureCategory";

const featureCategoriesData: any[] = [
  {
    name: "Must-Be Quality",
    description: "Essential features that must be present.",
  },
  {
    name: "One-Dimensional Quality",
    description: "Features where quality is linearly related to satisfaction.",
  },
  {
    name: "Attractive Quality",
    description: "Features that can delight users when present.",
  },
  {
    name: "Indifferent Quality",
    description: "Features that don't significantly impact satisfaction.",
  },
  {
    name: "Reverse Quality",
    description: "Features that can lead to dissatisfaction when present.",
  },
];

export async function createFeatureCategories() {
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
