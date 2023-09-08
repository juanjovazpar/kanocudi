import express, { Router } from "express";
import { Request, Response } from "express";
const router: Router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Health Check
 *   description: Check if the API is working correctly.
 */
/**
 * @swagger
 * /healthCheck:
 *   get:
 *     summary: Health check for the API
 *     description: Check if the API is working correctly.
 *     tags:
 *       - Health Check
 *     responses:
 *       200:
 *         description: API is up and running.
 */
router.get("/", (_: Request, res: Response) => {
  res.sendStatus(200);
});

export default router;
