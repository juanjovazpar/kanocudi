import express from "express";
import { getAllProducts, createProduct } from "../controllers/products";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Response
 *   description: Operations related to responses
 */

/**
 * @swagger
 * /response/{invitationToken}:
 *   get:
 *     summary: Get questionary
 *     description: Retrieve a questionary
 *     tags:
 *       - Response
 *     responses:
 *       '200':
 *         description: A questionary.
 *       '500':
 *         description: Error retrieving questionary.
 */
router.get("/:invitationToken", getAllProducts);

/**
 * @swagger
 * /response/{invitationToken}:
 *   post:
 *     summary: Reply questionary
 *     description: Reply questionary.
 *     tags:
 *       - Response
 *     requestBody:
 *       description: Product data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               response:
 *                 type: Response
 *                 description: The response to a quesionary.
 *     responses:
 *       '201':
 *         description: Questionary replied successful.
 *       '500':
 *         description: Error replying questionary.
 */
router.post("/:invitationToken", createProduct);

export default router;
