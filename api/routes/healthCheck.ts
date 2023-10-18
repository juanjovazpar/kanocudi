import express, { Router } from 'express';
import { Request, Response } from 'express';
const router: Router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Healthcheck
 *   description: Check if the API is working correctly.
 */
/**
 * @swagger
 * /api/healthcheck:
 *   get:
 *     summary: Healthcheck for the API
 *     description: Check if the API is working correctly.
 *     tags:
 *       - Healthcheck
 *     responses:
 *       200:
 *         description: API is up and running.
 */
router.get('/', (_: Request, res: Response) => {
  res.status(200).json({ message: 'Everything is working fine!' });
});

export default router;
