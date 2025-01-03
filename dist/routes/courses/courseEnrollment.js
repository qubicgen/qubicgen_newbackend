"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const courseEnrollment_1 = __importDefault(require("../../controllers/courseOperations/courseEnrollment"));
const checkAuth_1 = __importDefault(require("../../config/checkAuth"));
const router = (0, express_1.default)();
router.post('/newEnrollment', courseEnrollment_1.default.createEnrollment);
router.get('/allCourseEnrollments', checkAuth_1.default, courseEnrollment_1.default.getAllEnrollments);
// router.get('/courseEnrollmentDetails/:id',CourseEnrollmentOperations.getEnrollmentById)
router.put('/updateEnrollment/:id', checkAuth_1.default, courseEnrollment_1.default.updateEnrollment);
router.delete('/deleteEnrollment/:id', checkAuth_1.default, courseEnrollment_1.default.deleteEnrollment);
exports.default = router;
