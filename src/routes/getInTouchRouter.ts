import { Router } from "express";
import  GetInTouchOperations from '../controllers/getInTouchController'
const router=Router()


router.post('/newRequest',GetInTouchOperations.createNewGetInTouch)
router.get('/allRequests',GetInTouchOperations.getAllGetInTouchRequest)
router.get('/getRequestDetails/:id',GetInTouchOperations.getById)
router.put('/updateRequest/:id',GetInTouchOperations.updateId)
router.delete('/deleteRequestById',GetInTouchOperations.deleteById)

export default router