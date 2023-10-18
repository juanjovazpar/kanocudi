import express from 'express';
import { getAllProducts, createProduct } from '../controllers/products';
import { productOwnershipMiddleware } from '../middlewares/productOwnership';
import productRoutes from './product';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Operations related to products
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a list of all products owned by the user.
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of products.
 *       '500':
 *         description: Error retrieving products.
 */
router.get('/', getAllProducts);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product with a name and description.
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
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
 *       '201':
 *         description: Product creation successful.
 *       '500':
 *         description: Error creating product.
 */
router.post('/', createProduct);

router.use('/:product_id', productOwnershipMiddleware, productRoutes);

export default router;
