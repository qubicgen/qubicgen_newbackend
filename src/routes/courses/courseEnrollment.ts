import Router from 'express'
import CourseEnrollmentOperations from '../../controllers/courseOperations/courseEnrollment'
import checkAuth from '../../config/checkAuth'
const router=Router()
router.post('/newEnrollment',CourseEnrollmentOperations.createEnrollment)
router.get('/allCourseEnrollments',checkAuth,CourseEnrollmentOperations.getAllEnrollments)
// router.get('/courseEnrollmentDetails/:id',CourseEnrollmentOperations.getEnrollmentById)
router.put('/updateEnrollment/:id',checkAuth,CourseEnrollmentOperations.updateEnrollment)
router.delete('/deleteEnrollment/:id',checkAuth,CourseEnrollmentOperations.deleteEnrollment)
export default router

