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

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Operations related to products
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a list of all products owned by the user.
 *     tags:
 *       - Products
 *     responses:
 *       '200':
 *         description: A list of products.
 *       '500':
 *         description: Error retrieving products.
 */
router.get("/", getAllProducts);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product with a name and description.
 *     tags:
 *       - Products
 *     requestBody:
 *       description: Product data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the new product.
 *               description:
 *                 type: string
 *                 description: The description of the new product.
 *     responses:
 *       '201':
 *         description: Product creation successful.
 *       '500':
 *         description: Error creating product.
 */
router.post("/", createProduct);

/**
 * @swagger
 * /products/{product_id}:
 *   get:
 *     summary: Get a product by ID
 *     description: Retrieve a product by its ID.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *         type: string
 *         description: The ID of the product to retrieve.
 *     responses:
 *       '200':
 *         description: A product object.
 *       '404':
 *         description: Product not found.
 *       '500':
 *         description: Error retrieving product.
 */
router.get("/:product_id", getProductById);

/**
 * @swagger
 * /products/{product_id}:
 *   put:
 *     summary: Update a product by ID
 *     description: Update a product's name and description by its ID.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *         type: string
 *         description: The ID of the product to update.
 *     requestBody:
 *       description: Updated product data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The updated name of the product.
 *               description:
 *                 type: string
 *                 description: The updated description of the product.
 *     responses:
 *       '200':
 *         description: Updated product object.
 *       '404':
 *         description: Product not found.
 *       '500':
 *         description: Error updating product.
 */
router.put("/:product_id", updateProductById);

/**
 * @swagger
 * /products/{product_id}:
 *   delete:
 *     summary: Delete a product by ID
 *     description: Delete a product by its ID.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *         type: string
 *         description: The ID of the product to delete.
 *     responses:
 *       '204':
 *         description: Product deletion successful.
 *       '404':
 *         description: Product not found.
 *       '500':
 *         description: Error deleting product.
 */
router.delete("/:product_id", deleteProductById);

/**
 * @swagger
 * /products/{product_id}/invitations:
 *   post:
 *     summary: Create an invitation for a product
 *     description: Create an invitation for a product with a specified email.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *         type: string
 *         description: The ID of the product for which to create an invitation.
 *     requestBody:
 *       description: Invitation data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the invited user.
 *     responses:
 *       '201':
 *         description: Invitation creation successful.
 *       '404':
 *         description: Product not found.
 *       '500':
 *         description: Error creating invitation.
 */
router.post("/:product_id/invitations", createInvitationInProduct);

/**
 * @swagger
 * /products/{product_id}/invitations/{invitation_id}:
 *   put:
 *     summary: Update an invitation for a product
 *     description: Update the email of an invitation for a product.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *         type: string
 *         description: The ID of the product containing the invitation.
 *       - in: path
 *         name: invitation_id
 *         required: true
 *         type: string
 *         description: The ID of the invitation to update.
 *     requestBody:
 *       description: Updated invitation data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The updated email of the invited user.
 *     responses:
 *       '200':
 *         description: Updated invitation object.
 *       '404':
 *         description: Product or invitation not found.
 *       '500':
 *         description: Error updating invitation.
 */
router.put(
  "/:product_id/invitations/:invitation_id",
  updateInvitationInProduct
);

/**
 * @swagger
 * /products/{product_id}/invitations/{invitation_id}:
 *   delete:
 *     summary: Delete an invitation from a product
 *     description: Delete an invitation from a product by its ID.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *         type: string
 *         description: The ID of the product containing the invitation.
 *       - in: path
 *         name: invitation_id
 *         required: true
 *         type: string
 *         description: The ID of the invitation to delete.
 *     responses:
 *       '200':
 *         description: Invitation deletion successful.
 *       '404':
 *         description: Product or invitation not found.
 *       '500':
 *         description: Error deleting invitation.
 */
router.delete(
  "/:product_id/invitations/:invitation_id",
  deleteInvitationFromProduct
);

export default router;
