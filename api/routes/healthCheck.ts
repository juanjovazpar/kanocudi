import express, { Router } from "express";
import { Request, Response } from "express";
const router: Router = express.Router();

/**
 * @swagger
 * /healthCheck:
 *   post:
 *     summary: Health check for the API
 *     description: Check if the API is working correctly.
 *     tags:
 *       - Health Check
 *     responses:
 *       200:
 *         description: API is up and running.
 */
router.post("/", (_: Request, res: Response) => {
  res.sendStatus(200);
});

export default router;
