import { Router } from "express";
import GetInTouchOperations from "../controllers/getInTouchController";
const router = Router();

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
router.post('/newRequest', GetInTouchOperations.createNewGetInTouch);

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
router.get('/allRequests', GetInTouchOperations.getAllGetInTouchRequest);

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
router.get('/getRequestDetails/:id', GetInTouchOperations.getById);

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
router.put('/updateRequest/:id', GetInTouchOperations.updateId);

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
router.delete('/deleteRequestById/:id', GetInTouchOperations.deleteById);

export default router;
