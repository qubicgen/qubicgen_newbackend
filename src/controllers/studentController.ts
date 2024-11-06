import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

class StudentFormOperations {
  // Create a new student form entry
  static create = async (req: Request, res: Response): Promise<void> => {
    const { name, email, phone, course, college, stream, message } = req.body;

    try {
      const newStudentForm = await prisma.studentForm.create({
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
    } catch (error) {
      res.status(500).json({ error: "Failed to create student form entry" });
    }
  };

  // Get all student form entries
  static getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const studentForms = await prisma.studentForm.findMany();
      res.status(200).json(studentForms); // Return all student form entries
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve student form entries" });
    }
  };

  // Get a student form entry by ID
  static getById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
      const studentForm = await prisma.studentForm.findUnique({
        where: { id },
      });
      if (studentForm) {
        res.status(200).json(studentForm); // Return the specific student form entry
      } else {
        res.status(404).json({ error: "Student form entry not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve student form entry" });
    }
  };

  // Update a student form entry by ID
  static update = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, email, phone, course, college, stream, message } = req.body;

    try {
      const updatedStudentForm = await prisma.studentForm.update({
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
    } catch (error) {
      res.status(500).json({ error: "Failed to update student form entry" });
    }
  };

  // Delete a student form entry by ID
  static delete = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
      const deletedStudentForm = await prisma.studentForm.delete({
        where: { id },
      });
      res.status(200).json({
        message: "Student form entry deleted successfully",
        deletedStudentForm,
      }); // Return the deleted student form entry
    } catch (error) {
      res.status(500).json({ error: "Failed to delete student form entry" });
    }
  };
}

export default StudentFormOperations;
