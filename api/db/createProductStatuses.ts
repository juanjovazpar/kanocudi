import { ProductStatus } from "./schemas/productStatus";

export const DRAFT_STATUS = "draft";
export const READY_STATUS = "ready";
export const SENT_STATUS = "sent";
export const COMPLETE_STATUS = "complete";

const productStatusesData: any[] = [
  {
    name: DRAFT_STATUS,
    description: "The product doesn't fulfill the requirements to be sent yet.",
  },
  {
    name: READY_STATUS,
    description:
      "The product is ready to be sent but it is not being sent yet (it has between 6 and 30 features).",
  },
  {
    name: SENT_STATUS,
    description: "The product is being sent to some visitors.",
  },
  {
    name: COMPLETE_STATUS,
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
