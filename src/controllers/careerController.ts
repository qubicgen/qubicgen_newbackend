import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

class CareerOperations {
  // Create a new career entry
  static createNewCareer = async (req: Request, res: Response): Promise<void> => {
    const {
      fullName,
      gender,
      phoneNumber,
      whatsAppNumber,
      personalEmail,
      officeEmail,
      course,
      branch,
      collegeName,
      address,
      passedOutYear,
      tenthPercentage,
      twelthPercentage,
      graduationPercentage,
      resume,
      comments,
    } = req.body;

    try {
      const newCareer = await prisma.careers.create({
        data: {
          fullName,
          gender,
          phoneNumber,
          whatsappNumber: whatsAppNumber,
          personalEmail,
          officeEmail,
          course,
          branch,
          collegeName,
          address,
          passedOutYear: new Date(passedOutYear), // Assuming passedOutYear is in YYYY-MM-DD format
          tenthPercentage,
          twelthPercentage,
          graduationPercentage,
          resume,
          comments,
        },
      });
      res.status(201).json(newCareer); // Return the newly created career
    } catch (error) {
      res.status(500).json({ error: "Failed to create new career" });
    }
  };

  // Read all careers
  static getAllCareers = async (req: Request, res: Response): Promise<void> => {
    try {
      const careers = await prisma.careers.findMany();
      res.status(200).json(careers); // Return all career entries
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve careers" });
    }
  };

  // Read a specific career by ID
  static getCareerById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const career = await prisma.careers.findUnique({
        where: { id },
      });
      if (career) {
        res.status(200).json(career); // Return the specific career
      } else {
        res.status(404).json({ error: "Career not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve career" });
    }
  };

  // Update an existing career
  static updateCareer = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const {
      fullName,
      gender,
      phoneNumber,
      whatsAppNumber,
      personalEmail,
      officeEmail,
      course,
      branch,
      collegeName,
      address,
      passedOutYear,
      tenthPercentage,
      twelthPercentage,
      graduationPercentage,
      resume,
      comments,
    } = req.body;

    try {
      const updatedCareer = await prisma.careers.update({
        where: { id },
        data: {
          fullName,
          gender,
          phoneNumber,
          whatsappNumber: whatsAppNumber,
          personalEmail,
          officeEmail,
          course,
          branch,
          collegeName,
          address,
          passedOutYear: new Date(passedOutYear),
          tenthPercentage,
          twelthPercentage,
          graduationPercentage,
          resume,
          comments,
        },
      });
      res.status(200).json(updatedCareer); // Return the updated career
    } catch (error) {
      res.status(500).json({ error: "Failed to update career" });
    }
  };

  // Delete a career entry
  static deleteCareer = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const deletedCareer = await prisma.careers.delete({
        where: { id },
      });
      res.status(200).json({ message: "Career deleted successfully", deletedCareer });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete career" });
    }
  };
}

export default CareerOperations;
