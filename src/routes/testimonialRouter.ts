import Router from 'express'
const router=Router()
import testimonialsOperations from '../controllers/testimonialOperations'
import checkAuth from '../config/checkAuth'


router.post('/newTestimonial',testimonialsOperations.createNewTestimonial)
router.get('/allTestimonials',testimonialsOperations.getAllTestimonials)
router.get('/testimonials/:id',testimonialsOperations.getById)
router.put('/testimonials/:id',checkAuth,testimonialsOperations.updateId)
router.delete('/deleteTestimonials/:id',checkAuth,testimonialsOperations.deleteById)

export default router