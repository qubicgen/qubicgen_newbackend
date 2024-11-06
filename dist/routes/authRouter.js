"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticationController_1 = __importDefault(require("../controllers/authenticationController"));
const router = (0, express_1.Router)();
/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Login with email and password to obtain a JWT token.
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: User login credentials.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               example: user@example.com
 *             password:
 *               type: string
 *               example: password123
 *     responses:
 *       200:
 *         description: Login successful and JWT token returned.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Login successful'
 *                 token:
 *                   type: string
 *                   example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
 *       400:
 *         description: Invalid email or password.
 *       500:
 *         description: Internal server error.
 */
router.post('/login', authenticationController_1.default.userLogin);
/**
 * @swagger
 * /register:
 *   post:
 *     summary: User registration
 *     description: Register a new user by providing an email, password, and name.
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User details for registration.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               example: newuser@example.com
 *             password:
 *               type: string
 *               example: newpassword123
 *             name:
 *               type: string
 *               example: New User
 *     responses:
 *       201:
 *         description: User successfully registered and JWT token returned.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Registration successful'
 *                 token:
 *                   type: string
 *                   example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
 *       400:
 *         description: User with this email already exists.
 *       500:
 *         description: Internal server error.
 */
router.post('/register', authenticationController_1.default.userRegister);
exports.default = router;
