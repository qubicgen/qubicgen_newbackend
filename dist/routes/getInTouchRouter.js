"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getInTouchController_1 = __importDefault(require("../controllers/getInTouchController"));
const checkAuth_1 = __importDefault(require("../config/checkAuth"));
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: GetInTouch
 *   description: API for managing 'Get In Touch' requests
 */
/**
 * @swagger
 * /newRequest:
 *   post:
 *     summary: Create a new 'Get In Touch' entry
 *     tags: [GetInTouch]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: The newly created entry
 *       500:
 *         description: Failed to create entry
 */
router.post('/newRequest', getInTouchController_1.default.createNewGetInTouch);
/**
 * @swagger
 * /allRequests:
 *   get:
 *     summary: Retrieve all 'Get In Touch' entries
 *     tags: [GetInTouch]
 *     responses:
 *       200:
 *         description: List of all 'Get In Touch' entries
 *       500:
 *         description: Failed to retrieve entries
 */
router.get('/allRequests', checkAuth_1.default, getInTouchController_1.default.getAllGetInTouchRequest);
/**
 * @swagger
 * /getRequestDetails/{id}:
 *   get:
 *     summary: Retrieve a specific 'Get In Touch' entry by ID
 *     tags: [GetInTouch]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the 'Get In Touch' entry to retrieve
 *     responses:
 *       200:
 *         description: The specific entry
 *       404:
 *         description: Entry not found
 *       500:
 *         description: Failed to retrieve entry
 */
router.get('/getRequestDetails/:id', checkAuth_1.default, getInTouchController_1.default.getById);
/**
 * @swagger
 * /updateRequest/{id}:
 *   put:
 *     summary: Update an existing 'Get In Touch' entry
 *     tags: [GetInTouch]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the 'Get In Touch' entry to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated entry
 *       500:
 *         description: Failed to update entry
 */
router.put('/updateRequest/:id', checkAuth_1.default, getInTouchController_1.default.updateId);
/**
 * @swagger
 * /deleteRequestById/{id}:
 *   delete:
 *     summary: Delete a 'Get In Touch' entry by ID
 *     tags: [GetInTouch]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the 'Get In Touch' entry to delete
 *     responses:
 *       200:
 *         description: Entry deleted successfully
 *       500:
 *         description: Failed to delete entry
 */
router.delete('/deleteRequestById/:id', checkAuth_1.default, getInTouchController_1.default.deleteById);
exports.default = router;
