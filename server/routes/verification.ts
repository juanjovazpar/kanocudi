import express, { Router } from "express";
import { verifyUser } from "../controllers/verification";

const router: Router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Verification
 *   description: User verification
 */
/**
 * @swagger
 * /verify:
 *   get:
 *     summary: Verify user email
 *     tags: [Verificarion]
 *     responses:
 *       '200':
 *         description: Verified email.
 *       '401':
 *         description: Email or token not found.
 */
router.get("/:verificationToken", verifyUser); // TODO: Add authentication middleware to ensure only logged users can verify himself

export default router;
