import { Router } from "express";
import CareerOperations from "../controllers/careerController";
const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Career:
 *       type: object
 *       required:
 *         - fullName
 *         - gender
 *         - phoneNumber
 *         - personalEmail
 *         - course
 *         - branch
 *         - collegeName
 *         - address
 *         - passedOutYear
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the career entry
 *         fullName:
 *           type: string
 *         gender:
 *           type: string
 *         phoneNumber:
 *           type: string
 *         whatsappNumber:
 *           type: string
 *         personalEmail:
 *           type: string
 *         officeEmail:
 *           type: string
 *         course:
 *           type: string
 *         branch:
 *           type: string
 *         collegeName:
 *           type: string
 *         address:
 *           type: string
 *         passedOutYear:
 *           type: string
 *           format: date
 *         tenthPercentage:
 *           type: string
 *         twelthPercentage:
 *           type: string
 *         graduationPercentage:
 *           type: string
 *         resume:
 *           type: string
 *         comments:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         id: "uuid"
 *         fullName: "John Doe"
 *         gender: "Male"
 *         phoneNumber: "1234567890"
 *         whatsappNumber: "0987654321"
 *         personalEmail: "johndoe@example.com"
 *         officeEmail: "johndoe@company.com"
 *         course: "Engineering"
 *         branch: "Computer Science"
 *         collegeName: "XYZ University"
 *         address: "123 Main St"
 *         passedOutYear: "2020-05-15"
 *         tenthPercentage: "85%"
 *         twelthPercentage: "88%"
 *         graduationPercentage: "90%"
 *         resume: "link_to_resume.pdf"
 *         comments: "Good candidate"
 */

/**
 * @swagger
 * /newCareer:
 *   post:
 *     summary: Create a new career entry
 *     tags: [Career]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Career'
 *     responses:
 *       201:
 *         description: Career created successfully
 *       500:
 *         description: Failed to create career
 */
router.post('/newCareer', CareerOperations.createNewCareer);

/**
 * @swagger
 * /allCareers:
 *   get:
 *     summary: Get all career entries
 *     tags: [Career]
 *     responses:
 *       200:
 *         description: Successfully retrieved list of careers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Career'
 *       500:
 *         description: Failed to retrieve careers
 */
router.get('/allCareers', CareerOperations.getAllCareers);

/**
 * @swagger
 * /getCareerDetails/{careerId}:
 *   get:
 *     summary: Get a career entry by ID
 *     tags: [Career]
 *     parameters:
 *       - in: path
 *         name: careerId
 *         required: true
 *         schema:
 *           type: string
 *         description: The career ID
 *     responses:
 *       200:
 *         description: Successfully retrieved career entry
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Career'
 *       404:
 *         description: Career not found
 *       500:
 *         description: Failed to retrieve career
 */
router.get('/getCareerDetails/:careerId', CareerOperations.getCareerById);

/**
 * @swagger
 * /updateCareer/{careerId}:
 *   put:
 *     summary: Update a career entry by ID
 *     tags: [Career]
 *     parameters:
 *       - in: path
 *         name: careerId
 *         required: true
 *         schema:
 *           type: string
 *         description: The career ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Career'
 *     responses:
 *       200:
 *         description: Career updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Career'
 *       404:
 *         description: Career not found
 *       500:
 *         description: Failed to update career
 */
router.put('/updateCareer/:careerId', CareerOperations.updateCareer);

/**
 * @swagger
 * /deleteCareer/{careerId}:
 *   delete:
 *     summary: Delete a career entry by ID
 *     tags: [Career]
 *     parameters:
 *       - in: path
 *         name: careerId
 *         required: true
 *         schema:
 *           type: string
 *         description: The career ID
 *     responses:
 *       200:
 *         description: Career deleted successfully
 *       404:
 *         description: Career not found
 *       500:
 *         description: Failed to delete career
 */
router.delete('/deleteCareer/:careerId', CareerOperations.deleteCareer);

export default router;
