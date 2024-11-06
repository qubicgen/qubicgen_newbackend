import express from "express";
import ProjectFormOperations from "../controllers/projectController";

const router = express.Router();

// Create a new project form entry
router.post("/createProject", ProjectFormOperations.create);

// Get all project form entries
router.get("/projects", ProjectFormOperations.getAll);

// Get a project form entry by ID
router.get("/getProjectDetails/:id", ProjectFormOperations.getById);

// Update a project form entry by ID
router.put("/updateProject/:id", ProjectFormOperations.update);

// Delete a project form entry by ID
router.delete("/deleteProject/:id", ProjectFormOperations.delete);

export default router;
