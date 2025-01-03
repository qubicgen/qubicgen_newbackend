"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = (0, express_1.default)();
const courseOperations_1 = __importDefault(require("../../controllers/courseOperations/courseOperations"));
const checkAuth_1 = __importDefault(require("../../config/checkAuth"));
router.post('/newCourse', checkAuth_1.default, courseOperations_1.default.createCourse);
router.get('/allCourses', courseOperations_1.default.getAllCourses);
router.get('/courses/:id', courseOperations_1.default.getCouseById);
router.put('/updateCourse/:id', checkAuth_1.default, courseOperations_1.default.updateCourse);
router.delete('/deleteCourse/:id', checkAuth_1.default, courseOperations_1.default.deleteCourse);
exports.default = router;
