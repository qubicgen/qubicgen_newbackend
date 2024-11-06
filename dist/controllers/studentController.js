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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class StudentFormOperations {
}
_a = StudentFormOperations;
// Create a new student form entry
StudentFormOperations.create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone, course, college, stream, message } = req.body;
    try {
        const newStudentForm = yield prisma.studentForm.create({
            data: {
                name,
                email,
                phone,
                course,
                college,
                stream,
                message,
            },
        });
        res.status(201).json(newStudentForm); // Return the created student form entry
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create student form entry" });
    }
});
// Get all student form entries
StudentFormOperations.getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentForms = yield prisma.studentForm.findMany();
        res.status(200).json(studentForms); // Return all student form entries
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve student form entries" });
    }
});
// Get a student form entry by ID
StudentFormOperations.getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const studentForm = yield prisma.studentForm.findUnique({
            where: { id },
        });
        if (studentForm) {
            res.status(200).json(studentForm); // Return the specific student form entry
        }
        else {
            res.status(404).json({ error: "Student form entry not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve student form entry" });
    }
});
// Update a student form entry by ID
StudentFormOperations.update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, email, phone, course, college, stream, message } = req.body;
    try {
        const updatedStudentForm = yield prisma.studentForm.update({
            where: { id },
            data: {
                name,
                email,
                phone,
                course,
                college,
                stream,
                message,
            },
        });
        res.status(200).json(updatedStudentForm); // Return the updated student form entry
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update student form entry" });
    }
});
// Delete a student form entry by ID
StudentFormOperations.delete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedStudentForm = yield prisma.studentForm.delete({
            where: { id },
        });
        res.status(200).json({
            message: "Student form entry deleted successfully",
            deletedStudentForm,
        }); // Return the deleted student form entry
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete student form entry" });
    }
});
exports.default = StudentFormOperations;
