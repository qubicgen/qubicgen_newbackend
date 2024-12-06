import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
const prisma = new PrismaClient();

class CourseEnrollmentOperations {
  static async createEnrollment(req: Request, res: Response) {
    const { fullName, contactNumber, email, collegeName } = req.body;

    try {
      const newEnrollment = await prisma.courseEnrollmentForm.create({
        data: {
          fullName,
          contactNumber,
          email,
          collegeName,
        },
      });

      res.status(201).json(newEnrollment);
    } catch (error:any) {
      res.status(500).json({ error: "Failed to create enrollment", details: error.message });
    }
  }

  static async getAllEnrollments(req: Request, res: Response) {
    try {
      const enrollments = await prisma.courseEnrollmentForm.findMany();
      res.status(200).json(enrollments);
    } catch (error:any) {
      res.status(500).json({ error: "Failed to retrieve enrollments", details: error.message });
    }
  }

  static async getEnrollmentById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const enrollment = await prisma.courseEnrollmentForm.findFirst({
        where: { id },
      });

      if (!enrollment) {
        return res.status(404).json({ error: "Enrollment not found" });
      }

      res.status(200).json(enrollment);
    } catch (error:any) {
      res.status(500).json({ error: "Failed to retrieve enrollment", details: error.message });
    }
  }

  static async updateEnrollment(req: Request, res: Response) {
    const { id } = req.params;
    const { fullName, contactNumber, email, collegeName } = req.body;

    try {
      const updatedEnrollment = await prisma.courseEnrollmentForm.update({
        where: { id },
        data: {
          fullName,
          contactNumber,
          email,
          collegeName,
        },
      });

      res.status(200).json(updatedEnrollment);
    } catch (error:any) {
      res.status(500).json({ error: "Failed to update enrollment", details: error.message });
    }
  }

  static async deleteEnrollment(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await prisma.courseEnrollmentForm.delete({
        where: { id },
      });

      res.status(200).json({ message: "Enrollment deleted successfully" });
    } catch (error:any) {
      res.status(500).json({ error: "Failed to delete enrollment", details: error.message });
    }
  }
}

export default CourseEnrollmentOperations;
