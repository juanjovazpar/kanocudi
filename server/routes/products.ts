import express from "express";
import {
  getAllProducts,
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
} from "../controllers/products";
import {
  createInvitationInProduct,
  updateInvitationInProduct,
  deleteInvitationFromProduct,
} from "../controllers/invitations";

const router = express.Router();

router.get("/", getAllProducts);

router.post("/", createProduct);

router.get("/:product_id", getProductById);

router.put("/:product_id", updateProductById);

router.delete("/:product_id", deleteProductById);

router.post("/:product_id/invitations", createInvitationInProduct);

router.put(
  "/:product_id/invitations/:invitation_id",
  updateInvitationInProduct
);

router.delete(
  "/:product_id/invitations/:invitation_id",
  deleteInvitationFromProduct
);

export default router;
