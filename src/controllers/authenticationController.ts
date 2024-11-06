import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';
import { Response, Request, RequestHandler } from "express";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

class Authentication {
    static userLogin: RequestHandler = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        try {
            const user = await prisma.user.findFirst({
                where: { email, password } // Direct match on plain text password
            });
            if (!user) {
                res.status(400).json({ message: 'Invalid email or password' });
                return;
            }
            const tokenPayload = { id: user.id, email: user.email };
            const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ message: 'An error occurred during login' });
        }
    };

    // Registration method
    static userRegister: RequestHandler = async (req: Request, res: Response) => {
        const { email, password, name } = req.body;
        try {
            // Check if a user with the same email already exists
            const existingUser = await prisma.user.findFirst({
                where: { email } // Ensure email is unique in schema
            });
            if (existingUser) {
                res.status(400).json({ message: 'User already exists with this email' });
                return;
            }

            // Create a new user
            const newUser = await prisma.user.create({
                data: { email, password, name }
            });

            const tokenPayload = { id: newUser.id, email: newUser.email };
            const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '1h' });

            res.status(201).json({ message: 'Registration successful', token });
        } catch (error) {
            console.error('Registration error:', error);
            res.status(500).json({ message: 'An error occurred during registration' });
        }
    };
}

export default Authentication;
