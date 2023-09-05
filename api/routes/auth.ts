import express, { Router } from "express";
import { signup, signin } from "../controllers/auth";
import { forgot_password, resetPassword } from "../controllers/forgotPassword";
import { verifyUser } from "../controllers/verification";

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
 * /signin:
 *   post:
 *     summary: Log in a user
 *     tags: [Authentication]
 *     requestBody:
 *       description: User signin data
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
 *         description: signin successful.
 *       '401':
 *         description: Invalid username or password.
 */
router.post("/signin", signin);

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
 *               email:
 *                 type: string
 *                 description: The email of the user.
 *                 example: john_doe
 *     responses:
 *       '200':
 *         description: Recovery link has been sent.
 *       '401':
 *         description: Email not found.
 */
router.post("/forgot_password", forgot_password);

/**
 * @swagger
 * /forgot_password/:resetPasswordToken:
 *   post:
 *     summary: Reset password
 *     tags: [Authentication]
 *     requestBody:
 *       description: User reset password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *                 example: john_doe
 *     responses:
 *       '200':
 *         description: Password set succesfully.
 *       '401':
 *         description: User not found.
 */
router.post("/forgot_password/:resetPasswordToken", resetPassword);

/**
 * @swagger
 * /verify:
 *   get:
 *     summary: Verify user email
 *     tags: [Authentication]
 *     responses:
 *       '200':
 *         description: Verified email.
 *       '401':
 *         description: Email or token not found.
 */
router.post("verify/:verificationToken", verifyUser); // TODO: Add authentication middleware to ensure only logged users can verify himself

export default router;
