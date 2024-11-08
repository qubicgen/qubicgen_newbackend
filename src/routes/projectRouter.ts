import express from "express";
import ProjectFormOperations from "../controllers/projectController";
import checkAuth from "../config/checkAuth";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: ProjectForm
 *   description: API for managing project form entries
 */

/**
 * @swagger
 * /createProject:
 *   post:
 *     summary: Create a new project form entry
 *     tags: [ProjectForm]
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
 *               jobTitle:
 *                 type: string
 *               company:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: The newly created project form entry
 *       500:
 *         description: Failed to create project form entry
 */
router.post("/createProject", ProjectFormOperations.create);

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Retrieve all project form entries
 *     tags: [ProjectForm]
 *     responses:
 *       200:
 *         description: List of all project form entries
 *       500:
 *         description: Failed to retrieve project form entries
 */
router.get("/projects", checkAuth,ProjectFormOperations.getAll);

/**
 * @swagger
 * /getProjectDetails/{id}:
 *   get:
 *     summary: Retrieve a specific project form entry by ID
 *     tags: [ProjectForm]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the project form entry to retrieve
 *     responses:
 *       200:
 *         description: The specific project form entry
 *       404:
 *         description: Project form entry not found
 *       500:
 *         description: Failed to retrieve project form entry
 */
router.get("/getProjectDetails/:id", checkAuth,ProjectFormOperations.getById);

/**
 * @swagger
 * /updateProject/{id}:
 *   put:
 *     summary: Update a project form entry by ID
 *     tags: [ProjectForm]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the project form entry to update
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
 *               jobTitle:
 *                 type: string
 *               company:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated project form entry
 *       500:
 *         description: Failed to update project form entry
 */
router.put("/updateProject/:id", checkAuth,ProjectFormOperations.update);

/**
 * @swagger
 * /deleteProject/{id}:
 *   delete:
 *     summary: Delete a project form entry by ID
 *     tags: [ProjectForm]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the project form entry to delete
 *     responses:
 *       200:
 *         description: Project form entry deleted successfully
 *       500:
 *         description: Failed to delete project form entry
 */
router.delete("/deleteProject/:id", checkAuth,ProjectFormOperations.delete);

export default router;
