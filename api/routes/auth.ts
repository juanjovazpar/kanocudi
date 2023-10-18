import express, { Router } from 'express';
import { signup, signin } from '../controllers/auth';
import { forgot_password, resetPassword } from '../controllers/forgotPassword';
import { verifyUser } from '../controllers/verification';
import { getLoggedUser } from '../controllers/loggedUser';
import { authTokenMiddleware } from '../middlewares/authToken';

const router: Router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and signup operations
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: User sign-up
 *     description: Register a new user with a username and password.
 *     tags: [Authentication]
 *     requestBody:
 *       description: User signup data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email for the new user.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The password for the new user.
 *             example:
 *               email: "test@kanocudi.com"
 *               password: "changeMe123!"
 *     responses:
 *       '201':
 *         description: User created successfully.
 *       '400':
 *         description: Email already exists.
 *       '500':
 *         description: Error creating user.
 */
router.post('/signup', signup);

/**
 * @swagger
 * /api/auth/signin:
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
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User email.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User password.
 *             example:
 *               email: "test@kanocudi.com"
 *               password: "changeMe123!"
 *     responses:
 *       '200':
 *         description: Signin successful.
 *       '401':
 *         description: Authentication failed. User not found | Incorrect password.
 */
router.post('/signin', signin);

/**
 * @swagger
 * /api/auth/forgot_password:
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
 *                 format: email
 *                 description: User email.
 *             example:
 *               email: "test@kanocudi.com"
 *     responses:
 *       '200':
 *         description: Reset password email sent successfully.
 *       '400':
 *         description: Invalid email format
 *       '401':
 *         description: Request failed. User not found | Email not found.
 */
router.post('/forgot_password', forgot_password);

/**
 * @swagger
 * /api/auth/forgot_password/{resetPasswordToken}:
 *   post:
 *     summary: Reset password
 *     tags: [Authentication]
 *     parameters:
 *     - name: resetPasswordToken
 *       in: path
 *       description: Token to reset Password
 *       required: true
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
 *                 format: password
 *                 description: New password for the user.
 *
 *     responses:
 *       '200':
 *         description: Password set succesfully.
 *       '404':
 *         description: Invalid reset password token
 *       '400':
 *         description: Invalid password format.
 */
router.post('/forgot_password/:resetPasswordToken', resetPassword);

/**
 * @swagger
 * /api/auth/verify/{verificationToken}:
 *   get:
 *     summary: Verify user email
 *     tags: [Authentication]
 *     parameters:
 *     - name: verificationToken
 *       in: path
 *       description: Token to verify user
 *       required: true
 *     responses:
 *       '200':
 *         description: Verified email.
 *       '404':
 *         description: Email or token not found.
 */
router.get('/verify/:verificationToken', verifyUser); // TODO: Add authentication middleware to ensure only logged users can verify himself

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get logged user information
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Logged user data.
 *       '401':
 *         description: Authentication failed. User not found | Incorrect password.
 */
router.get('/me', authTokenMiddleware, getLoggedUser);

export default router;
