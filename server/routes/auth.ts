import express, { Router } from "express";
import { signup, login, forgot_password } from "../controllers/auth";

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
 *     summary: User Sign-Up
 *     description: Register a new user with a username and password.
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: integer
 *         description: The ID of the example to retrieve.
 *     requestBody:
 *       description: User signup data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The desired username for the new user.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The password for the new user.
 *     responses:
 *       '201':
 *         description: User registration successful.
 *       '400':
 *         description: Username already exists or validation error.
 *       '500':
 *         description: Error during user registration.
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

/**
 * @swagger
 * /forgot_password:
 *   post:
 *     summary: Forgot password
 *     tags: [Authentication]
 *     requestBody:
 *       description: User forgot password
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
 *     responses:
 *       '200':
 *         description: Recovery link has been sent.
 *       '401':
 *         description: Username not found.
 */
router.post("/forgot_password", forgot_password);

export default router;
