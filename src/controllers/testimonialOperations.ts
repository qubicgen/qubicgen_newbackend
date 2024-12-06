import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

class testimonialsOperations {
  // Create a new 'Get In Touch' entry
  static createNewTestimonial = async (req: Request, res: Response): Promise<void> => {
    const { name, email, testimonial,designation } = req.body;
    try {
      const newEntry = await prisma.testimonials.create({
        data: {
          name:name,
          email,
          designation:designation,
          testimonial:testimonial
        },
      });
      res.status(201).json(newEntry); // Return the newly created entry
    } catch (error) {
      res.status(500).json({ error: "Failed to create entry" });
    }
  };

  // Get all 'Get In Touch' entries
  static getAllTestimonials = async (req: Request, res: Response): Promise<void> => {
    try {
      const entries = await prisma.testimonials.findMany();
      res.status(200).json(entries); // Return all entries
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve entries" });
    }
  };

  // Get a specific 'Get In Touch' entry by ID
  static getById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const entry = await prisma.testimonials.findFirst({
        where: { id },
      });
      if (entry) {
        res.status(200).json(entry); // Return the specific entry
      } else {
        res.status(404).json({ error: "Entry not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve entry" });
    }
  };

  // Update an existing 'Get In Touch' entry
  static updateId = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, email, designation,testimonial } = req.body;
    try {
      const updatedEntry = await prisma.testimonials.update({
        where: { id },
        data: {
          name:name,
          email,
          designation:designation,
          testimonial:testimonial,
        },
      });
      res.status(200).json(updatedEntry); // Return the updated entry
    } catch (error) {
      res.status(500).json({ error: "Failed to update entry" });
    }
  };

  // Delete a 'Get In Touch' entry
  static deleteById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const deletedEntry = await prisma.testimonials.delete({
        where: { id },
      });
      res.status(200).json({ message: "Entry deleted successfully", deletedEntry });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete entry" });
    }
  };
}

export default testimonialsOperations;
