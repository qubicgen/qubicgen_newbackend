import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

class QueryOperations {
  // Create a new query entry
  static create = async (req: Request, res: Response): Promise<void> => {
    const { firstName, lastName, email, jobTitle, company, phone, message } = req.body;

    try {
      const newQuery = await prisma.queries.create({
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
    } catch (error) {
      res.status(500).json({ error: "Failed to create query entry" });
    }
  };

  // Get all query entries
  static getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const queries = await prisma.queries.findMany();
      res.status(200).json(queries); // Return all query entries
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve query entries" });
    }
  };

  // Get a query entry by ID
  static getById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
      const query = await prisma.queries.findUnique({
        where: { id },
      });
      if (query) {
        res.status(200).json(query); // Return the specific query entry
      } else {
        res.status(404).json({ error: "Query entry not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve query entry" });
    }
  };

  // Update a query entry by ID
  static update = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { firstName, lastName, email, jobTitle, company, phone, message } = req.body;

    try {
      const updatedQuery = await prisma.queries.update({
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
    } catch (error) {
      res.status(500).json({ error: "Failed to update query entry" });
    }
  };

  // Delete a query entry by ID
  static delete = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
      const deletedQuery = await prisma.queries.delete({
        where: { id },
      });
      res.status(200).json({
        message: "Query entry deleted successfully",
        deletedQuery,
      }); // Return the deleted query entry
    } catch (error) {
      res.status(500).json({ error: "Failed to delete query entry" });
    }
  };
}

export default QueryOperations;
