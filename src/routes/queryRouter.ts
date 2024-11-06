import Router from 'express'
import QueryOperations from '../controllers/queryController';
const router=Router()

// Create a new query entry
router.post("/newQuery", QueryOperations.create);

// Get all query entries
router.get("/allQueries", QueryOperations.getAll);

// Get a query entry by ID
router.get("/getQueryDetails/:id", QueryOperations.getById);

// Update a query entry by ID
router.put("/updateQuery/:id", QueryOperations.update);

// Delete a query entry by ID
router.delete("/deleteQuery/:id", QueryOperations.delete);

export default router;
