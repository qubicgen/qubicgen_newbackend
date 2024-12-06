import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const jwtSecret = process.env.JWT_SECRET || "";

// Multer configuration for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, "../../uploads");
      if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${file.originalname}`;
      cb(null, uniqueName);
    },
  }),
}).fields([
  { name: "brochure", maxCount: 1 },
  { name: "certificate", maxCount: 1 },
]);

class CourseOperations {
  // Extracts user data from the JWT token
  static extractUserDataFromToken(req: Request) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("Token is missing");

    try {
      return jwt.verify(token, jwtSecret) as Record<string, any>;
    } catch {
      throw new Error("Invalid token");
    }
  }

  // Create a new course with related lessons, FAQs, and brands
  static async createCourse(req: Request, res: Response) {
    upload(req, res, async (err) => {
      if (err) return res.status(500).json({ error: "File upload failed", details: err.message });

      try {
        const {
          courseName,
          courseType,
          duration,
          maxMentees,
          technologies,
          rating,
          brochure,
          certificate,
          startDate,
          endDate,
          courseDescription,
          lessons,
          faqs,
          brands,
        } = req.body;

        // Parse JSON arrays or default to empty arrays
        const parsedLessons = lessons ?lessons : [];
        const parsedFaqs = faqs ?faqs : [];
        const parsedBrands = brands ? brands : [];

        // Create course with nested related entities
        const newCourse = await prisma.course.create({
          data: {
            courseName,
            courseType,
            duration: parseInt(duration, 10),
            maxMentees: parseInt(maxMentees, 10),
            technologies,
            rating: parseInt(rating, 10),
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            courseDescription,
            brochure:brochure,
            certificate: certificate,
            courseLessons: { create: parsedLessons },
            courseFaqs: { create: parsedFaqs },
            courseBrands: { create: parsedBrands },
          },
          include: { courseBrands: true, courseLessons: true, courseFaqs: true },
        });

        res.status(201).json(newCourse);
      } catch (error: any) {
        res.status(500).json({ error: "Failed to create course", details: error.message });
      }
    });
  }

  // Get a course by its ID, including related entities
  static async getCouseById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const courses = await prisma.course.findFirst({
        where:{
          id:id
        },
        include: { courseBrands: true, courseLessons: true, courseFaqs: true },
      });
      res.status(200).json(courses);
    } catch (error: any) {
      res.status(500).json({ error: "Failed to retrieve courses", details: error.message });
    }
  }
  // Get all courses with their related entities
  static async getAllCourses(req: Request, res: Response) {
    try {
      const courses = await prisma.course.findMany({
        include: { courseBrands: true, courseLessons: true, courseFaqs: true },
      });
      res.status(200).json(courses);
    } catch (error: any) {
      res.status(500).json({ error: "Failed to retrieve courses", details: error.message });
    }
  }

  // Update an existing course and its related entities
  static async updateCourse(req: Request, res: Response) {
    upload(req, res, async (err) => {
      if (err) return res.status(500).json({ error: "File upload failed", details: err.message });

      try {
        const { id } = req.params;
        const {
          courseName,
          courseType,
          duration,
          maxMentees,
          technologies,
          rating,
          brochure,
          certificate,
          startDate,
          endDate,
          courseDescription,
          lessons,
          faqs,
          brands,
        } = req.body;

        const updatedCourse = await prisma.course.update({
          where: { id },
          data: {
            courseName,
            courseType,
            duration: parseInt(duration, 10),
            maxMentees: parseInt(maxMentees, 10),
            technologies,
            rating: parseInt(rating, 10),
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            courseDescription,
            brochure: brochure,
            certificate: certificate,
            courseLessons: { deleteMany: {}, create: lessons || "[]" },
            courseFaqs: { deleteMany: {}, create: faqs || "[]" },
            courseBrands: { deleteMany: {}, create: brands || "[]" },
          },
        });

        res.status(200).json(updatedCourse);
      } catch (error: any) {
        res.status(500).json({ error: "Failed to update course", details: error.message });
      }
    });
  }

  // Delete a course by its ID
  static async deleteCourse(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await prisma.course.delete({ where: { id } });
      res.status(200).json({ message: "Course deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ error: "Failed to delete course", details: error.message });
    }
  }
}

export default CourseOperations;
