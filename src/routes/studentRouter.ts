import Router from 'express'
import StudentFormOperations from '../controllers/studentController'
const router=Router()
// Create a new student form entry
router.post("/student-forms", StudentFormOperations.create);

// Get all student form entries
router.get("/student-forms", StudentFormOperations.getAll);

// Get a student form entry by ID
router.get("/student-forms/:id", StudentFormOperations.getById);

// Update a student form entry by ID
router.put("/student-forms/:id", StudentFormOperations.update);

// Delete a student form entry by ID
router.delete("/student-forms/:id", StudentFormOperations.delete);

export default router