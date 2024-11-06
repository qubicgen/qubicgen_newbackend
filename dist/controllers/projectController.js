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
class ProjectFormOperations {
}
_a = ProjectFormOperations;
// Create a new project form entry
ProjectFormOperations.create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone, jobTitle, company, message } = req.body;
    try {
        const newProjectForm = yield prisma.projectForm.create({
            data: {
                name,
                email,
                phone,
                jobTitle,
                company,
                message,
            },
        });
        res.status(201).json(newProjectForm); // Return the created project form entry
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create project form entry" });
    }
});
// Get all project form entries
ProjectFormOperations.getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectForms = yield prisma.projectForm.findMany();
        res.status(200).json(projectForms); // Return all project form entries
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve project form entries" });
    }
});
// Get a project form entry by ID
ProjectFormOperations.getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const projectForm = yield prisma.projectForm.findUnique({
            where: { id },
        });
        if (projectForm) {
            res.status(200).json(projectForm); // Return the specific project form entry
        }
        else {
            res.status(404).json({ error: "Project form entry not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve project form entry" });
    }
});
// Update a project form entry by ID
ProjectFormOperations.update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, email, phone, jobTitle, company, message } = req.body;
    try {
        const updatedProjectForm = yield prisma.projectForm.update({
            where: { id },
            data: {
                name,
                email,
                phone,
                jobTitle,
                company,
                message,
            },
        });
        res.status(200).json(updatedProjectForm); // Return the updated project form entry
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update project form entry" });
    }
});
// Delete a project form entry by ID
ProjectFormOperations.delete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedProjectForm = yield prisma.projectForm.delete({
            where: { id },
        });
        res.status(200).json({
            message: "Project form entry deleted successfully",
            deletedProjectForm,
        }); // Return the deleted project form entry
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete project form entry" });
    }
});
exports.default = ProjectFormOperations;
