import { Router } from "express";
import CareerOperations from "../controllers/careerController";
const router=Router()

router.post('/newCareer',CareerOperations.createNewCareer)
router.get('/allCareers',CareerOperations.getAllCareers)
router.get('/getCareerDetails/:careerId',CareerOperations.getCareerById)
router.put('/updateCareer/:careerId',CareerOperations.updateCareer)
router.delete('/deleteCareer/:careerId',CareerOperations.deleteCareer)

export default router
