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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class CourseEnrollmentOperations {
    static createEnrollment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fullName, contactNumber, email, collegeName } = req.body;
            try {
                const newEnrollment = yield prisma.courseEnrollmentForm.create({
                    data: {
                        fullName,
                        contactNumber,
                        email,
                        collegeName,
                    },
                });
                res.status(201).json(newEnrollment);
            }
            catch (error) {
                res.status(500).json({ error: "Failed to create enrollment", details: error.message });
            }
        });
    }
    static getAllEnrollments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const enrollments = yield prisma.courseEnrollmentForm.findMany();
                res.status(200).json(enrollments);
            }
            catch (error) {
                res.status(500).json({ error: "Failed to retrieve enrollments", details: error.message });
            }
        });
    }
    static getEnrollmentData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const enrollments = yield prisma.courseEnrollmentForm.findFirst({
                    where: {
                        id: id
                    }
                });
                res.status(200).json(enrollments);
            }
            catch (error) {
                res.status(500).json({ error: "Failed to retrieve enrollments", details: error.message });
            }
        });
    }
    static updateEnrollment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { fullName, contactNumber, email, collegeName } = req.body;
            try {
                const updatedEnrollment = yield prisma.courseEnrollmentForm.update({
                    where: { id },
                    data: {
                        fullName,
                        contactNumber,
                        email,
                        collegeName,
                    },
                });
                res.status(200).json(updatedEnrollment);
            }
            catch (error) {
                res.status(500).json({ error: "Failed to update enrollment", details: error.message });
            }
        });
    }
    static deleteEnrollment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield prisma.courseEnrollmentForm.delete({
                    where: { id },
                });
                res.status(200).json({ message: "Enrollment deleted successfully" });
            }
            catch (error) {
                res.status(500).json({ error: "Failed to delete enrollment", details: error.message });
            }
        });
    }
}
exports.default = CourseEnrollmentOperations;
