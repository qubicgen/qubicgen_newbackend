"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const prisma = new client_1.PrismaClient();
const jwtSecret = process.env.JWT_SECRET || "";
// Multer configuration for file uploads
const upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            const uploadPath = path_1.default.join(__dirname, "../../uploads");
            if (!fs_1.default.existsSync(uploadPath))
                fs_1.default.mkdirSync(uploadPath, { recursive: true });
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            const uniqueName = `${Date.now()}-${file.originalname}`;
            cb(null, uniqueName);
        },
    }),
}).fields([
    { name: "brochure", maxCount: 1 },
    { name: "certificate", maxCount: 1 },
]);
class CourseOperations {
    // Extracts user data from the JWT token
    static extractUserDataFromToken(req) {
        var _a;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token)
            throw new Error("Token is missing");
        try {
            return jsonwebtoken_1.default.verify(token, jwtSecret);
        }
        catch (_b) {
            throw new Error("Invalid token");
        }
    }
    // Create a new course with related lessons, FAQs, and brands
    static createCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            upload(req, res, (err) => __awaiter(this, void 0, void 0, function* () {
                if (err)
                    return res.status(500).json({ error: "File upload failed", details: err.message });
                try {
                    const { courseName, courseType, duration, maxMentees, technologies, courseImg, courseBanner, rating, brochure, certificate, startDate, endDate, courseDescription, lessons, faqs, brands, } = req.body;
                    // Parse JSON arrays or default to empty arrays
                    const parsedLessons = lessons ? lessons : [];
                    const parsedFaqs = faqs ? faqs : [];
                    const parsedBrands = brands ? brands : [];
                    // Create course with nested related entities
                    const newCourse = yield prisma.course.create({
                        data: {
                            courseName,
                            courseType,
                            duration: parseInt(duration, 10),
                            maxMentees: parseInt(maxMentees, 10),
                            technologies,
                            rating: parseInt(rating, 10),
                            courseImage: courseImg,
                            courseBanner: courseBanner,
                            startDate: new Date(startDate),
                            endDate: new Date(endDate),
                            courseDescription,
                            brochure: brochure,
                            certificate: certificate,
                            courseLessons: { create: parsedLessons },
                            courseFaqs: { create: parsedFaqs },
                            courseBrands: { create: parsedBrands },
                        },
                        include: { courseBrands: true, courseLessons: true, courseFaqs: true },
                    });
                    res.status(201).json(newCourse);
                }
                catch (error) {
                    res.status(500).json({ error: "Failed to create course", details: error.message });
                }
            }));
        });
    }
    // Get a course by its ID, including related entities
    static getCouseById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const courses = yield prisma.course.findFirst({
                    where: {
                        id: id
                    },
                    include: { courseBrands: true, courseLessons: true, courseFaqs: true },
                });
                res.status(200).json(courses);
            }
            catch (error) {
                res.status(500).json({ error: "Failed to retrieve courses", details: error.message });
            }
        });
    }
    // Get all courses with their related entities
    static getAllCourses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courses = yield prisma.course.findMany({
                    include: { courseBrands: true, courseLessons: true, courseFaqs: true },
                });
                res.status(200).json(courses);
            }
            catch (error) {
                res.status(500).json({ error: "Failed to retrieve courses", details: error.message });
            }
        });
    }
    // Update an existing course and its related entities
    static updateCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            upload(req, res, (err) => __awaiter(this, void 0, void 0, function* () {
                if (err)
                    return res.status(500).json({ error: "File upload failed", details: err.message });
                try {
                    const { id } = req.params;
                    const { courseName, courseType, duration, maxMentees, technologies, rating, courseImg, courseBanner, brochure, certificate, startDate, endDate, courseDescription, lessons, faqs, brands, } = req.body;
                    const updatedCourse = yield prisma.course.update({
                        where: { id },
                        data: {
                            courseName,
                            courseType,
                            duration: parseInt(duration, 10),
                            maxMentees: parseInt(maxMentees, 10),
                            technologies,
                            rating: parseInt(rating, 10),
                            courseImage: courseImg,
                            courseBanner: courseBanner,
                            startDate: new Date(startDate),
                            endDate: new Date(endDate),
                            courseDescription,
                            brochure: brochure,
                            certificate: certificate,
                            courseLessons: { deleteMany: {}, create: lessons || "[]" },
                            courseFaqs: { deleteMany: {}, create: faqs || "[]" },
                            courseBrands: { deleteMany: {}, create: brands || "[]" },
                        },
                        include: {
                            courseBrands: true,
                            courseFaqs: true,
                            courseLessons: true
                        }
                    });
                    res.status(200).json(updatedCourse);
                }
                catch (error) {
                    res.status(500).json({ error: "Failed to update course", details: error.message });
                }
            }));
        });
    }
    // Delete a course by its ID
    static deleteCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield prisma.course.delete({ where: { id } });
                res.status(200).json({ message: "Course deleted successfully" });
            }
            catch (error) {
                res.status(500).json({ error: "Failed to delete course", details: error.message });
            }
        });
    }
}
exports.default = CourseOperations;
