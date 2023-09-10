import express from "express";
import {
  getResponseByInvitationToken,
  responseByInvitationToken,
} from "../controllers/response";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Response
 *   description: Operations related to responses
 */

/**
 * @swagger
 * /response/{invitation_token}:
 *   get:
 *     summary: Get questionary
 *     description: Retrieve a questionary
 *     tags:
 *       - Response
 *     parameters:
 *       - in: path
 *         name: invitation_token
 *         required: true
 *         type: string
 *         description: The ID of the invitation to get the questionary.
 *     responses:
 *       '200':
 *         description: A questionary related with the invitation.
 *       '500':
 *         description: Error retrieving questionary.
 */
router.get("/", getResponseByInvitationToken);

/**
 * @swagger
 * /response/{invitation_token}:
 *   post:
 *     summary: Reply questionary
 *     description: Reply questionary.
 *     tags:
 *       - Response
 *     parameters:
 *       - in: path
 *         name: invitation_token
 *         required: true
 *         type: string
 *         description: The ID of the invitation to get the questionary.
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
router.post("/", responseByInvitationToken);

export default router;
