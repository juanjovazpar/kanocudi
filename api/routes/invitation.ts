import express from "express";
import {
  updateInvitationInProduct,
  deleteInvitationFromProduct,
} from "../controllers/invitation";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Invitation
 *   description: Operations related to an invitation
 */

/**
 * @swagger
 * /products/{product_id}/invitations/{invitation_id}:
 *   put:
 *     summary: Update an invitation for a product
 *     description: Update the email of an invitation for a product.
 *     tags:
 *       - Invitation
 *     security:
 *       - bearerAuth: []
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
router.put("/", updateInvitationInProduct);

/**
 * @swagger
 * /products/{product_id}/invitations/{invitation_id}:
 *   delete:
 *     summary: Delete an invitation from a product
 *     description: Delete an invitation from a product by its ID.
 *     tags:
 *       - Invitation
 *     security:
 *       - bearerAuth: []
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
router.delete("/", deleteInvitationFromProduct);

export default router;
