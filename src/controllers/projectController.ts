import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

class ProjectFormOperations {
  // Create a new project form entry
  static create = async (req: Request, res: Response): Promise<void> => {
    const { name, email, phone, jobTitle, company, message } = req.body;

    try {
      const newProjectForm = await prisma.projectForm.create({
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
    } catch (error) {
      res.status(500).json({ error: "Failed to create project form entry" });
    }
  };

  // Get all project form entries
  static getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const projectForms = await prisma.projectForm.findMany();
      res.status(200).json(projectForms); // Return all project form entries
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve project form entries" });
    }
  };

  // Get a project form entry by ID
  static getById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
      const projectForm = await prisma.projectForm.findUnique({
        where: { id },
      });
      if (projectForm) {
        res.status(200).json(projectForm); // Return the specific project form entry
      } else {
        res.status(404).json({ error: "Project form entry not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve project form entry" });
    }
  };

  // Update a project form entry by ID
  static update = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, email, phone, jobTitle, company, message } = req.body;

    try {
      const updatedProjectForm = await prisma.projectForm.update({
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
    } catch (error) {
      res.status(500).json({ error: "Failed to update project form entry" });
    }
  };

  // Delete a project form entry by ID
  static delete = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
      const deletedProjectForm = await prisma.projectForm.delete({
        where: { id },
      });
      res.status(200).json({
        message: "Project form entry deleted successfully",
        deletedProjectForm,
      }); // Return the deleted project form entry
    } catch (error) {
      res.status(500).json({ error: "Failed to delete project form entry" });
    }
  };
}

export default ProjectFormOperations;
