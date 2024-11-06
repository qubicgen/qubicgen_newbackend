"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const studentController_1 = __importDefault(require("../controllers/studentController"));
const checkAuth_1 = __importDefault(require("../config/checkAuth"));
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Student Forms
 *   description: API for managing student form entries
 */
/**
 * @swagger
 * /student-forms:
 *   post:
 *     summary: Create a new student form entry
 *     tags: [Student Forms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               course:
 *                 type: string
 *               college:
 *                 type: string
 *               stream:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: The newly created student form entry
 *       500:
 *         description: Failed to create student form entry
 */
router.post("/student-forms", studentController_1.default.create);
/**
 * @swagger
 * /student-forms:
 *   get:
 *     summary: Retrieve all student form entries
 *     tags: [Student Forms]
 *     responses:
 *       200:
 *         description: List of all student form entries
 *       500:
 *         description: Failed to retrieve student form entries
 */
router.get("/student-forms", checkAuth_1.default, studentController_1.default.getAll);
/**
 * @swagger
 * /student-forms/{id}:
 *   get:
 *     summary: Retrieve a specific student form entry by ID
 *     tags: [Student Forms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the student form entry to retrieve
 *     responses:
 *       200:
 *         description: The specific student form entry
 *       404:
 *         description: Student form entry not found
 *       500:
 *         description: Failed to retrieve student form entry
 */
router.get("/student-forms/:id", checkAuth_1.default, studentController_1.default.getById);
/**
 * @swagger
 * /student-forms/{id}:
 *   put:
 *     summary: Update a student form entry by ID
 *     tags: [Student Forms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the student form entry to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               course:
 *                 type: string
 *               college:
 *                 type: string
 *               stream:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated student form entry
 *       500:
 *         description: Failed to update student form entry
 */
router.put("/student-forms/:id", checkAuth_1.default, studentController_1.default.update);
/**
 * @swagger
 * /student-forms/{id}:
 *   delete:
 *     summary: Delete a student form entry by ID
 *     tags: [Student Forms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the student form entry to delete
 *     responses:
 *       200:
 *         description: Student form entry deleted successfully
 *       500:
 *         description: Failed to delete student form entry
 */
router.delete("/student-forms/:id", checkAuth_1.default, studentController_1.default.delete);
exports.default = router;