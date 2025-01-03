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
class testimonialsOperations {
}
_a = testimonialsOperations;
// Create a new 'Get In Touch' entry
testimonialsOperations.createNewTestimonial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, testimonial, designation } = req.body;
    try {
        const newEntry = yield prisma.testimonials.create({
            data: {
                name: name,
                email,
                designation: designation,
                testimonial: testimonial
            },
        });
        res.status(201).json(newEntry); // Return the newly created entry
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create entry" });
    }
});
// Get all 'Get In Touch' entries
testimonialsOperations.getAllTestimonials = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const entries = yield prisma.testimonials.findMany();
        res.status(200).json(entries); // Return all entries
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve entries" });
    }
});
// Get a specific 'Get In Touch' entry by ID
testimonialsOperations.getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const entry = yield prisma.testimonials.findFirst({
            where: { id },
        });
        if (entry) {
            res.status(200).json(entry); // Return the specific entry
        }
        else {
            res.status(404).json({ error: "Entry not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve entry" });
    }
});
// Update an existing 'Get In Touch' entry
testimonialsOperations.updateId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, email, designation, testimonial } = req.body;
    try {
        const updatedEntry = yield prisma.testimonials.update({
            where: { id },
            data: {
                name: name,
                email,
                designation: designation,
                testimonial: testimonial,
            },
        });
        res.status(200).json(updatedEntry); // Return the updated entry
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update entry" });
    }
});
// Delete a 'Get In Touch' entry
testimonialsOperations.deleteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedEntry = yield prisma.testimonials.delete({
            where: { id },
        });
        res.status(200).json({ message: "Entry deleted successfully", deletedEntry });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete entry" });
    }
});
exports.default = testimonialsOperations;
