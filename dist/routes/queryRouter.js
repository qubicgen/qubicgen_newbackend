"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const queryController_1 = __importDefault(require("../controllers/queryController"));
const checkAuth_1 = __importDefault(require("../config/checkAuth"));
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Queries
 *   description: API for managing query entries
 */
/**
 * @swagger
 * /newQuery:
 *   post:
 *     summary: Create a new query entry
 *     tags: [Queries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               jobTitle:
 *                 type: string
 *               company:
 *                 type: string
 *               phone:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: The newly created query entry
 *       500:
 *         description: Failed to create query entry
 */
router.post("/newQuery", checkAuth_1.default, queryController_1.default.create);
/**
 * @swagger
 * /allQueries:
 *   get:
 *     summary: Retrieve all query entries
 *     tags: [Queries]
 *     responses:
 *       200:
 *         description: List of all query entries
 *       500:
 *         description: Failed to retrieve query entries
 */
router.get("/allQueries", checkAuth_1.default, queryController_1.default.getAll);
/**
 * @swagger
 * /getQueryDetails/{id}:
 *   get:
 *     summary: Retrieve a specific query entry by ID
 *     tags: [Queries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the query entry to retrieve
 *     responses:
 *       200:
 *         description: The specific query entry
 *       404:
 *         description: Query entry not found
 *       500:
 *         description: Failed to retrieve query entry
 */
router.get("/getQueryDetails/:id", checkAuth_1.default, queryController_1.default.getById);
/**
 * @swagger
 * /updateQuery/{id}:
 *   put:
 *     summary: Update a query entry by ID
 *     tags: [Queries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the query entry to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               jobTitle:
 *                 type: string
 *               company:
 *                 type: string
 *               phone:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated query entry
 *       500:
 *         description: Failed to update query entry
 */
router.put("/updateQuery/:id", checkAuth_1.default, queryController_1.default.update);
/**
 * @swagger
 * /deleteQuery/{id}:
 *   delete:
 *     summary: Delete a query entry by ID
 *     tags: [Queries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the query entry to delete
 *     responses:
 *       200:
 *         description: Query entry deleted successfully
 *       500:
 *         description: Failed to delete query entry
 */
router.delete("/deleteQuery/:id", checkAuth_1.default, queryController_1.default.delete);
exports.default = router;
