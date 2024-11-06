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
class QueryOperations {
}
_a = QueryOperations;
// Create a new query entry
QueryOperations.create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, jobTitle, company, phone, message } = req.body;
    try {
        const newQuery = yield prisma.queries.create({
            data: {
                firstName,
                lastName,
                email,
                jobTitle,
                company,
                phone,
                message,
            },
        });
        res.status(201).json(newQuery); // Return the created query entry
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create query entry" });
    }
});
// Get all query entries
QueryOperations.getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queries = yield prisma.queries.findMany();
        res.status(200).json(queries); // Return all query entries
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve query entries" });
    }
});
// Get a query entry by ID
QueryOperations.getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const query = yield prisma.queries.findUnique({
            where: { id },
        });
        if (query) {
            res.status(200).json(query); // Return the specific query entry
        }
        else {
            res.status(404).json({ error: "Query entry not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve query entry" });
    }
});
// Update a query entry by ID
QueryOperations.update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { firstName, lastName, email, jobTitle, company, phone, message } = req.body;
    try {
        const updatedQuery = yield prisma.queries.update({
            where: { id },
            data: {
                firstName,
                lastName,
                email,
                jobTitle,
                company,
                phone,
                message,
            },
        });
        res.status(200).json(updatedQuery); // Return the updated query entry
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update query entry" });
    }
});
// Delete a query entry by ID
QueryOperations.delete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedQuery = yield prisma.queries.delete({
            where: { id },
        });
        res.status(200).json({
            message: "Query entry deleted successfully",
            deletedQuery,
        }); // Return the deleted query entry
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete query entry" });
    }
});
exports.default = QueryOperations;
