import { ProductStatus } from "../schemas/productStatus";

const productStatusesData: any[] = [
  {
    name: "Draft",
    description: "The product doesn't fulfill the requirements to be sent yet.",
  },
  {
    name: "Ready",
    description:
      "The product is ready to be sent but it is not being sent yet (it has between 6 and 30 features).",
  },
  {
    name: "Sent",
    description: "The product is being sent to some visitors.",
  },
  {
    name: "Complete",
    description:
      "The product has been responded to at least 10 times and is considered complete.",
  },
];

export async function createInitialProductStatuses() {
  try {
    const existingStatuses = await ProductStatus.find({
      name: { $in: productStatusesData.map((status) => status.name) },
    });

    const newStatuses = productStatusesData.filter(
      (status) =>
        !existingStatuses.some(
          (existingStatus) => existingStatus.name === status.name
        )
    );

    if (newStatuses.length === 0) {
      console.log("All product statuses already exist.");
      return;
    }

    const createdStatuses = await ProductStatus.insertMany(newStatuses);

    console.log("Product statuses created:", createdStatuses);
  } catch (error) {
    console.error("Error creating product statuses:", error);
  }
}
