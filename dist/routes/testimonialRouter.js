"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = (0, express_1.default)();
const testimonialOperations_1 = __importDefault(require("../controllers/testimonialOperations"));
const checkAuth_1 = __importDefault(require("../config/checkAuth"));
router.post('/newTestimonial', testimonialOperations_1.default.createNewTestimonial);
router.get('/allTestimonials', testimonialOperations_1.default.getAllTestimonials);
router.get('/testimonials/:id', testimonialOperations_1.default.getById);
router.put('/testimonials/:id', checkAuth_1.default, testimonialOperations_1.default.updateId);
router.delete('/deleteTestimonials/:id', checkAuth_1.default, testimonialOperations_1.default.deleteById);
exports.default = router;
