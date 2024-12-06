import Router from 'express'
const router=Router()
import CourseOperations from '../../controllers/courseOperations/courseOperations'
import checkAuth from '../../config/checkAuth'
router.post('/newCourse',checkAuth,CourseOperations.createCourse)
router.get('/allCourses',CourseOperations.getAllCourses)
router.get('/courses/:id',CourseOperations.getCourseById)
router.put('/updateCourse/:id',checkAuth,CourseOperations.updateCourse)
router.delete('/deleteCourse/:id',checkAuth,CourseOperations.deleteCourse)
export default router