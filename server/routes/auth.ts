import express, { Router } from "express";
import { signup, login } from "../controllers/auth";

const router: Router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and signup operations
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Create a new user account
 *     tags: [Authentication]
 *     requestBody:
 *       description: User signup data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *                 example: john_doe
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: mysecurepassword
 *     responses:
 *       '201':
 *         description: User successfully created.
 *       '400':
 *         description: Bad request, validation error, or user already exists.
 */
router.post("/signup", signup);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in a user
 *     tags: [Authentication]
 *     requestBody:
 *       description: User login data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *                 example: john_doe
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: mysecurepassword
 *     responses:
 *       '200':
 *         description: Login successful.
 *       '401':
 *         description: Invalid username or password.
 */
router.post("/login", login);

export default router;
