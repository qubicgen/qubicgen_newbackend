import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import fs from 'fs';
import path from 'path';
import { transporter } from "../config/emailConfig";

const prisma = new PrismaClient();

class CareerOperations {
  // Create a new career entry
  // static createNewCareer = async (req: Request, res: Response): Promise<void> => {
  //   upload(req, res, async (err: any) => {
  //     if (err) {
  //       console.error("File upload error:", err);
  //       res.status(400).json({ error: "Error uploading file", message: err.message });
  //       return;
  //     }

  //     const {
  //       fullName = "", // Provide a default value to avoid missing arguments
  //       gender = "",
  //       phoneNumber = "",
  //       whatsAppNumber = "",
  //       personalEmail = "",
  //       officeEmail = "",
  //       course = "",
  //       branch = "",
  //       collegeName = "",
  //       address = "",
  //       passedOutYear = "",
  //       tenthPercentage = "0",
  //       twelthPercentage = "0",
  //       graduationPercentage = "0",
  //       comments = "",
  //     } = req.body;

  //     try {
  //       const resumePath = req.file ? req.file.path : "";

  //       const newCareer = await prisma.careers.create({
  //         data: {
  //           fullName,
  //           gender,
  //           phoneNumber,
  //           whatsappNumber: whatsAppNumber,
  //           personalEmail,
  //           officeEmail,
  //           course,
  //           branch,
  //           collegeName,
  //           address,
  //           passedOutYear: passedOutYear ? new Date(passedOutYear) : '',
  //           tenthPercentage: tenthPercentage || null,
  //           twelthPercentage: twelthPercentage || null,
  //           graduationPercentage: graduationPercentage || null,
  //           resume: resumePath,
  //           comments,
  //         },
  //       });

  //       // Send confirmation email to applicant
  //       await CareerOperations.sendApplicantEmail(personalEmail, fullName);

  //       // Send notification email to HR
  //       await CareerOperations.sendHrNotification(newCareer);

  //       res.status(201).json(newCareer);
  //     } catch (error) {
  //       console.error("Error creating career entry:", error);
  //       if (req.file) fs.unlinkSync(req.file.path); // Clean up file if there’s an error
  //       res.status(500).json({ error: "Failed to create new career" });
  //     }
  //   });
  // };

  // // Function to send email to the applicant
  // static async sendApplicantEmail(email: string, fullName: string) {
  //   const htmlContent = `
  //     <div style="font-family: Arial, sans-serif; padding: 20px;">
  //       <h2>Application Received - QubicGen</h2>
  //       <p>Dear ${fullName},</p>
  //       <p>Thank you for applying to QubicGen. We have received your application and will review it shortly.</p>
  //       <p><strong>Application Details:</strong></p>
  //       <ul>
  //         <li>Name: ${fullName}</li>
  //         <li>Email: ${email}</li>
  //         <li>Position: Job Application</li>
  //       </ul>
  //       <p>Best regards,<br>QubicGen Team</p>
  //     </div>
  //   `;

  //   const mailOptions = {
  //     from: process.env.EMAIL_USER || "services@qubicgen.com",
  //     to: email,
  //     subject: "Application Received - QubicGen",
  //     html: htmlContent,
  //   };

  //   try {
  //     await transporter.sendMail(mailOptions);
  //     console.log(`Email sent to applicant: ${email}`);
  //   } catch (error) {
  //     console.error("Error sending email to applicant:", error);
  //   }
  // }

  // // Function to send notification to HR
  // static async sendHrNotification(careerData: any) {
  //   const hrEmail = process.env.HR_EMAIL || "hr@qubicgen.com";
  //   const htmlContent = `
  //     <div style="font-family: Arial, sans-serif; padding: 20px;">
  //       <h2>New Application Submitted - QubicGen</h2>
  //       <p>A new job application has been submitted. Here are the details:</p>
  //       <ul>
  //         <li>Name: ${careerData.fullName}</li>
  //         <li>Email: ${careerData.personalEmail}</li>
  //         <li>WhatsApp: ${careerData.whatsappNumber}</li>
  //         <li>Phone: ${careerData.phoneNumber}</li>
  //         <li>Position: Job Application</li>
  //         <li>College: ${careerData.collegeName}</li>
  //         <li>Course: ${careerData.course}</li>
  //         <li>Graduation Percentage: ${careerData.graduationPercentage}</li>
  //       </ul>
  //       <p>Best regards,<br>QubicGen Team</p>
  //     </div>
  //   `;

  //   const mailOptions = {
  //     from: process.env.EMAIL_USER || "services@qubicgen.com",
  //     to: hrEmail,
  //     subject: "New Job Application Submitted - QubicGen",
  //     html: htmlContent,
  //   };

  //   try {
  //     await transporter.sendMail(mailOptions);
  //     console.log(`Email sent to HR: ${hrEmail}`);
  //   } catch (error) {
  //     console.error("Error sending email to HR:", error);
  //   }
  // }
  static createNewCareer = async (req: Request, res: Response): Promise<void> => {
    const {
      fullName = "",
      gender = "",
      phoneNumber = "",
      whatsAppNumber = "",
      personalEmail = "",
      officeEmail = "",
      course = "",
      branch = "",
      collegeName = "",
      address = "",
      passedOutYear = "",
      tenthPercentage = "0",
      twelthPercentage = "0",
      graduationPercentage = "0",
      comments = "",
    } = req.body;

    try {
      const resumePath = req.file ? req.file.path : "";

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
          passedOutYear: passedOutYear ,
          tenthPercentage: tenthPercentage || null,
          twelthPercentage: twelthPercentage || null,
          graduationPercentage: graduationPercentage || null,
          resume: resumePath,
          comments,
        },
      });

      // Send emails
      await CareerOperations.sendApplicantEmail(personalEmail, fullName);
      await CareerOperations.sendHrNotification(newCareer);

      res.status(201).json(newCareer);
    } catch (error) {
      console.error("Error creating career entry:", error);
      if (req.file) fs.unlinkSync(req.file.path); // Clean up file if there’s an error
      res.status(500).json({ error: "Failed to create new career" });
    }
  };

  static async sendApplicantEmail(email: string, fullName: string) {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Application Received - QubicGen</h2>
        <p>Dear ${fullName},</p>
        <p>Thank you for applying to QubicGen. We have received your application and will review it shortly.</p>
        <p><strong>Application Details:</strong></p>
        <ul>
          <li>Name: ${fullName}</li>
          <li>Email: ${email}</li>
          <li>Position: Job Application</li>
        </ul>
        <p>Best regards,<br>QubicGen Team</p>
      </div>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER || "services@qubicgen.com",
      to: email,
      subject: "Application Received - QubicGen",
      html: htmlContent,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`Email sent to applicant: ${email}`);
    } catch (error) {
      console.error("Error sending email to applicant:", error);
    }
  }

  static async sendHrNotification(careerData: any) {
    const hrEmail = process.env.HR_EMAIL || "hr@qubicgen.com";
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>New Application Submitted - QubicGen</h2>
        <p>A new job application has been submitted. Here are the details:</p>
        <ul>
          <li>Name: ${careerData.fullName}</li>
          <li>Email: ${careerData.personalEmail}</li>
          <li>WhatsApp: ${careerData.whatsappNumber}</li>
          <li>Phone: ${careerData.phoneNumber}</li>
          <li>Position: Job Application</li>
          <li>College: ${careerData.collegeName}</li>
          <li>Course: ${careerData.course}</li>
          <li>Graduation Percentage: ${careerData.graduationPercentage}</li>
        </ul>
        <p>Best regards,<br>QubicGen Team</p>
      </div>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER || "services@qubicgen.com",
      to: hrEmail,
      subject: "New Job Application Submitted - QubicGen",
      html: htmlContent,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`Email sent to HR: ${hrEmail}`);
    } catch (error) {
      console.error("Error sending email to HR:", error);
    }
  }
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
function upload(req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, arg2: (err: any) => Promise<void>) {
  throw new Error("Function not implemented.");
}

