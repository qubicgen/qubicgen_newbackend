import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import fs from 'fs';
import path from 'path';

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
      const resumePath = req.file ? req.file.path : '';
      
      const newCareer = await prisma.careers.create({
        data: {
          fullName,
          gender,
          phoneNumber,
          whatsappNumber: whatsAppNumber,
          personalEmail:personalEmail,
          officeEmail:officeEmail,
          course:course,
          branch:branch,
          collegeName:collegeName,
          address:address,
          passedOutYear: new Date(passedOutYear),
          tenthPercentage:tenthPercentage,
          twelthPercentage:twelthPercentage,
          graduationPercentage:graduationPercentage,
          resume: resumePath,
          comments:comments,
        },
      });
      
      res.status(201).json(newCareer);
    } catch (error) {
      if (req.file) {
        fs.unlinkSync(req.file.path); // Clean up uploaded file if database operation fails
      }
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
      const career = await prisma.careers.findUnique({
        where: { id },
      });

      if (career?.resume && fs.existsSync(career.resume)) {
        fs.unlinkSync(career.resume);
      }

      const deletedCareer = await prisma.careers.delete({
        where: { id },
      });

      res.status(200).json({ message: "Career deleted successfully", deletedCareer });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete career" });
    }
  };

  // Add new method for updating resume
  static updateResume = async (req: Request, res: Response): Promise<void> => {
    const { careerId } = req.params;
    
    try {
      // Get existing career to find old resume
      const existingCareer = await prisma.careers.findUnique({
        where: { id: careerId },
      });

      if (!existingCareer) {
        if (req.file) fs.unlinkSync(req.file.path);
        res.status(404).json({ error: "Career not found" });
        return;
      }

      // Delete old resume file if it exists
      if (existingCareer.resume && fs.existsSync(existingCareer.resume)) {
        fs.unlinkSync(existingCareer.resume);
      }

      const resumePath = req.file ? req.file.path : ''; // Use empty string as fallback

      // Update with new resume
      const updatedCareer = await prisma.careers.update({
        where: { id: careerId },
        data: {
          resume: resumePath,
        },
      });

      res.status(200).json(updatedCareer);
    } catch (error) {
      if (req.file) fs.unlinkSync(req.file.path);
      res.status(500).json({ error: "Failed to update resume" });
    }
  };
}

export default CareerOperations;
