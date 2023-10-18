import express from 'express';
import { createInvitationInProduct } from '../controllers/invitations';
import { invitationOwnershipMiddleware } from '../middlewares/invitationOwnership';
import invitationRoutes from './invitation';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Invitations
 *   description: Operations related to a product's invitations
 */

/**
 * @swagger
 * /api/products/{product_id}/invitations:
 *   post:
 *     summary: Create an invitation for a product
 *     description: Create an invitation for a product with a specified email.
 *     tags:
 *       - Invitations
 *     security:
 *       - bearerAuth: []
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
router.post('/', createInvitationInProduct);

router.use('/:invitation_id', invitationOwnershipMiddleware, invitationRoutes);

export default router;
