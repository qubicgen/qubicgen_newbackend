import Router from 'express'
const router=Router()
import CourseOperations from '../../controllers/courseOperations/courseOperations'
router.post('/newCourse',CourseOperations.createCourse)
router.get('/allCourses',CourseOperations.getAllCourses)
router.get('/courses/:id',CourseOperations.getCourseById)
router.put('/updateCourse/:id',CourseOperations.updateCourse)
router.delete('/deleteCourse/:id',CourseOperations.deleteCourse)
export default router