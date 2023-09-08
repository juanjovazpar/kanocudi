import express, { Router } from "express";
import { authTokenMiddleware } from "../middlewares/authToken";
import { getLoggedUser } from "../controllers/loggedUser";
import { getInitialConfig } from "../controllers/initialConfig";

const router: Router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Initial Config
 *   description: Get basic information
 */

/**
 * @swagger
 * /config:
 *   get:
 *     summary: Get initial configuration
 *     tags: [Initial Config]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Get initial configuration.
 *       '401':
 *         description: Authentication failed. User not found | Incorrect password.
 */
router.get("/", authTokenMiddleware, getInitialConfig);

export default router;
