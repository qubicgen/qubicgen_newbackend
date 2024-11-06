"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs_1 = __importDefault(require("fs"));
const emailConfig_1 = require("../config/emailConfig");
const prisma = new client_1.PrismaClient();
class CareerOperations {
    static sendApplicantEmail(email, fullName) {
        return __awaiter(this, void 0, void 0, function* () {
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
                yield emailConfig_1.transporter.sendMail(mailOptions);
                console.log(`Email sent to applicant: ${email}`);
            }
            catch (error) {
                console.error("Error sending email to applicant:", error);
            }
        });
    }
    static sendHrNotification(careerData) {
        return __awaiter(this, void 0, void 0, function* () {
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
                yield emailConfig_1.transporter.sendMail(mailOptions);
                console.log(`Email sent to HR: ${hrEmail}`);
            }
            catch (error) {
                console.error("Error sending email to HR:", error);
            }
        });
    }
}
_a = CareerOperations;
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
CareerOperations.createNewCareer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName = "", gender = "", phoneNumber = "", whatsAppNumber = "", personalEmail = "", officeEmail = "", course = "", branch = "", collegeName = "", address = "", passedOutYear = "", tenthPercentage = "0", twelthPercentage = "0", graduationPercentage = "0", comments = "", } = req.body;
    try {
        const resumePath = req.file ? req.file.path : "";
        const newCareer = yield prisma.careers.create({
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
                passedOutYear: passedOutYear,
                tenthPercentage: tenthPercentage || null,
                twelthPercentage: twelthPercentage || null,
                graduationPercentage: graduationPercentage || null,
                resume: resumePath,
                comments,
            },
        });
        // Send emails
        yield _a.sendApplicantEmail(personalEmail, fullName);
        yield _a.sendHrNotification(newCareer);
        res.status(201).json(newCareer);
    }
    catch (error) {
        console.error("Error creating career entry:", error);
        if (req.file)
            fs_1.default.unlinkSync(req.file.path); // Clean up file if there’s an error
        res.status(500).json({ error: "Failed to create new career" });
    }
});
// Read all careers
CareerOperations.getAllCareers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const careers = yield prisma.careers.findMany();
        res.status(200).json(careers); // Return all career entries
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve careers" });
    }
});
// Read a specific career by ID
CareerOperations.getCareerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const career = yield prisma.careers.findUnique({
            where: { id },
        });
        if (career) {
            res.status(200).json(career); // Return the specific career
        }
        else {
            res.status(404).json({ error: "Career not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve career" });
    }
});
// Update an existing career
CareerOperations.updateCareer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { fullName, gender, phoneNumber, whatsAppNumber, personalEmail, officeEmail, course, branch, collegeName, address, passedOutYear, tenthPercentage, twelthPercentage, graduationPercentage, resume, comments, } = req.body;
    try {
        const updatedCareer = yield prisma.careers.update({
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
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update career" });
    }
});
// Delete a career entry
CareerOperations.deleteCareer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const career = yield prisma.careers.findUnique({
            where: { id },
        });
        if ((career === null || career === void 0 ? void 0 : career.resume) && fs_1.default.existsSync(career.resume)) {
            fs_1.default.unlinkSync(career.resume);
        }
        const deletedCareer = yield prisma.careers.delete({
            where: { id },
        });
        res.status(200).json({ message: "Career deleted successfully", deletedCareer });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete career" });
    }
});
// Add new method for updating resume
CareerOperations.updateResume = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { careerId } = req.params;
    try {
        // Get existing career to find old resume
        const existingCareer = yield prisma.careers.findUnique({
            where: { id: careerId },
        });
        if (!existingCareer) {
            if (req.file)
                fs_1.default.unlinkSync(req.file.path);
            res.status(404).json({ error: "Career not found" });
            return;
        }
        // Delete old resume file if it exists
        if (existingCareer.resume && fs_1.default.existsSync(existingCareer.resume)) {
            fs_1.default.unlinkSync(existingCareer.resume);
        }
        const resumePath = req.file ? req.file.path : ''; // Use empty string as fallback
        // Update with new resume
        const updatedCareer = yield prisma.careers.update({
            where: { id: careerId },
            data: {
                resume: resumePath,
            },
        });
        res.status(200).json(updatedCareer);
    }
    catch (error) {
        if (req.file)
            fs_1.default.unlinkSync(req.file.path);
        res.status(500).json({ error: "Failed to update resume" });
    }
});
exports.default = CareerOperations;
function upload(req, res, arg2) {
    throw new Error("Function not implemented.");
}
