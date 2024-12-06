import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const jwtSecret = process.env.JWT_SECRET || "";

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
  static extractUserDataFromToken(req: Request) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("Token is missing");

    try {
      return jwt.verify(token, jwtSecret) as Record<string, any>;
    } catch {
      throw new Error("Invalid token");
    }
  }

  static async createCourse(req: Request, res: Response) {
    upload(req, res, async (err) => {
      if (err) return res.status(500).json({ error: "File upload failed", details: err.message });
      const brochurePath = req.file ? req.file.path : "";
      const certificatePath = req.file ? req.file.path : "";

      try {
        const userData = CourseOperations.extractUserDataFromToken(req);
        const { courseName, courseType, duration, maxMentees, brochure,certificate,technologies, rating, startDate, endDate, courseDescription, lessons, faqs, brands } = req.body;

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
            brochure: brochure,
            certificate:certificate,
            courseLessons: { create: JSON.parse(lessons || "[]") },
            courseFaqs: { create: JSON.parse(faqs || "[]") },
            courseBrands: { create: JSON.parse(brands || "[]") },
          },
        });

        res.status(201).json(newCourse);
      } catch (error: any) {
        res.status(500).json({ error: "Failed to create course", details: error.message });
      }
    });
  }

  static async getCourseById(req: Request, res: Response) {
    const {id}=req.params
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


  static async updateCourse(req: Request, res: Response) {
    upload(req, res, async (err) => {
      if (err) return res.status(500).json({ error: "File upload failed", details: err.message });
      const brochurePath = req.file ? req.file.path : "";
      const certificatePath = req.file ? req.file.path : "";
      try {
        const { id } = req.params;
        const { courseName, courseType, duration, maxMentees, technologies, rating, startDate, endDate, courseDescription, lessons, faqs, brands } = req.body;

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
            brochure:brochurePath,
            certificate: certificatePath,
            courseLessons: { deleteMany: {}, create: JSON.parse(lessons || "[]") },
            courseFaqs: { deleteMany: {}, create: JSON.parse(faqs || "[]") },
            courseBrands: { deleteMany: {}, create: JSON.parse(brands || "[]") },
          },
        });

        res.status(200).json(updatedCourse);
      } catch (error: any) {
        res.status(500).json({ error: "Failed to update course", details: error.message });
      }
    });
  }

  static async deleteCourse(req: Request, res: Response) {
    try {
      await prisma.course.delete({ where: { id: req.params.id } });
      res.status(200).json({ message: "Course deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ error: "Failed to delete course", details: error.message });
    }
  }
}

export default CourseOperations;
