import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import Memcached from 'memcached'; // Import Memcached

const prisma = new PrismaClient();

// Initialize Memcached client
const memcached = new Memcached('localhost:11211'); // Assuming Memcached is running locally on the default port

class CourseEnrollmentOperations {
  static async createEnrollment(req: Request, res: Response) {
    const { fullName, contactNumber, email, collegeName, coursePrice,programName } = req.body;

    try {
      const newEnrollment = await prisma.courseEnrollmentForm.create({
        data: {
          fullName,
          contactNumber,
          email,
          collegeName,
          coursePrice,
          programName
        },
      });

      // Clear cache after a new enrollment is created
      memcached.del('allEnrollments', (err, data) => {
        if (err) {
          console.error("Error clearing cache:", err);
        } else {
          console.log("Cache cleared after new enrollment.");
        }
      });

      res.status(201).json(newEnrollment);
    } catch (error: any) {
      res.status(500).json({ error: "Failed to create enrollment", details: error.message });
    }
  }

  static async getAllEnrollments(req: Request, res: Response) {
    const cacheKey = 'allEnrollments'; // Cache key for all enrollments
    memcached.get(cacheKey, async (err, data) => {
      if (err) {
        console.error("Error retrieving from cache:", err);
      }

      // If data is found in the cache
      if (data) {
        console.log("Serving from cache");
        return res.status(200).json(JSON.parse(data as string)); // Cache hit
      } else {
        // If data is not found in cache, fetch from database
        try {
          const enrollments = await prisma.courseEnrollmentForm.findMany();
          
          // Store result in cache for 10 minutes
          memcached.set(cacheKey, JSON.stringify(enrollments), 600, (err) => {
            if (err) {
              console.error("Error caching data:", err);
            } else {
              console.log("Data cached successfully.");
            }
          });

          res.status(200).json(enrollments); // Cache miss
        } catch (error: any) {
          res.status(500).json({ error: "Failed to retrieve enrollments", details: error.message });
        }
      }
    });
  }

  static async getEnrollmentData(req: Request, res: Response) {
    const { id } = req.params;
    const cacheKey = `enrollment_${id}`; // Cache key for individual enrollment

    memcached.get(cacheKey, async (err, data) => {
      if (err) {
        console.error("Error retrieving from cache:", err);
      }

      // If data is found in the cache
      if (data) {
        console.log("Serving from cache");
        return res.status(200).json(JSON.parse(data as string)); // Cache hit
      } else {
        // If data is not found in cache, fetch from database
        try {
          const enrollment = await prisma.courseEnrollmentForm.findFirst({
            where: { id:id },
          });

          if (enrollment) {
            // Store result in cache for 10 minutes
            memcached.set(cacheKey, JSON.stringify(enrollment), 600, (err) => {
              if (err) {
                console.error("Error caching data:", err);
              } else {
                console.log("Data cached successfully.");
              }
            });

            res.status(200).json(enrollment); // Cache miss
          } else {
            res.status(404).json({ error: "Enrollment not found" });
          }
        } catch (error: any) {
          res.status(500).json({ error: "Failed to retrieve enrollment", details: error.message });
        }
      }
    });
  }

  static async updateEnrollment(req: Request, res: Response) {
    const { id } = req.params;
    const { fullName, contactNumber, email, collegeName, coursePrice,programName } = req.body;

    try {
      const updatedEnrollment = await prisma.courseEnrollmentForm.update({
        where: { id: id },
        data: {
          fullName,
          contactNumber,
          email,
          collegeName,
          coursePrice,
          programName
        },
      });

      // Clear cache after updating an enrollment
      memcached.del(`enrollment_${id}`, (err, data) => {
        if (err) {
          console.error("Error clearing cache:", err);
        } else {
          console.log(`Cache cleared for enrollment_${id}.`);
        }
      });

      // Clear cache for all enrollments
      memcached.del('allEnrollments', (err, data) => {
        if (err) {
          console.error("Error clearing all enrollments cache:", err);
        } else {
          console.log("Cache cleared for all enrollments.");
        }
      });

      res.status(200).json(updatedEnrollment);
    } catch (error: any) {
      res.status(500).json({ error: "Failed to update enrollment", details: error.message });
    }
  }

  static async deleteEnrollment(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await prisma.courseEnrollmentForm.delete({
        where: { id: id },
      });

      // Clear cache after deleting an enrollment
      memcached.del(`enrollment_${id}`, (err, data) => {
        if (err) {
          console.error("Error clearing cache:", err);
        } else {
          console.log(`Cache cleared for enrollment_${id}.`);
        }
      });

      // Clear cache for all enrollments
      memcached.del('allEnrollments', (err, data) => {
        if (err) {
          console.error("Error clearing all enrollments cache:", err);
        } else {
          console.log("Cache cleared for all enrollments.");
        }
      });

      res.status(200).json({ message: "Enrollment deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ error: "Failed to delete enrollment", details: error.message });
    }
  }
}

export default CourseEnrollmentOperations;
