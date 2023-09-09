import express from "express";
import {
  getProductById,
  updateProductById,
  deleteProductById,
  getProductResultsById,
} from "../controllers/product";
import invitationsRoutes from "./invitations";

const router = express.Router();

/**
 * @swagger
 * /products/{product_id}:
 *   get:
 *     summary: Get a product by ID
 *     description: Retrieve a product by its ID.
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
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
router.get("/", getProductById);

/**
 * @swagger
 * /products/{product_id}:
 *   put:
 *     summary: Update a product by ID
 *     description: Update a product's name and description by its ID.
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
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
 *                 description: The name of the new product.
 *               description:
 *                 type: string
 *                 description: The description of the new product.
 *               features:
 *                 type: array
 *                 description: An array of features associated with the product.
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: The name of the feature.
 *                     description:
 *                       type: string
 *                       description: The description of the feature.
 *                     positive_question:
 *                       type: string
 *                       description: The positive question associated with the feature.
 *                     negative_question:
 *                       type: string
 *                       description: The negative question associated with the feature.
 *               invitations:
 *                 type: array
 *                 description: An array of email invitations.
 *                 items:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       description: The email address for the invitation.
 *             example:
 *               name: "Product with features and invitations"
 *               description: "Sample product description"
 *               features:
 *                 - name: "Feature 1"
 *                   description: "Sample feature 1 description"
 *                   positive_question: "Is it positive?"
 *                   negative_question: "Is it negative?"
 *                 - name: "Feature 2"
 *                   description: "Sample feature 2 description"
 *                   positive_question: "Is it positive?"
 *                   negative_question: "Is it negative?"
 *               invitations:
 *                 - email: "user1@example.com"
 *                 - email: "user2@example.com"
 *     responses:
 *       '200':
 *         description: Updated product object.
 *       '404':
 *         description: Product not found.
 *       '500':
 *         description: Error updating product.
 */
router.put("/", updateProductById);

/**
 * @swagger
 * /products/{product_id}:
 *   delete:
 *     summary: Delete a product by ID
 *     description: Delete a product by its ID.
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
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
router.delete("/", deleteProductById);

/**
 * @swagger
 * /products/{product_id}/results:
 *   get:
 *     summary: Get a product result by ID
 *     description: Retrieve a product result by its ID.
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *         type: string
 *         description: The ID of the product to retrieve the results.
 *     responses:
 *       '200':
 *         description: A result object.
 *       '404':
 *         description: Product not found.
 *       '500':
 *         description: Error retrieving results.
 */
router.get("/results", getProductResultsById);

router.use("/invitations", invitationsRoutes);

export default router;
