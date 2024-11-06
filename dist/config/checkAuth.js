"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = __importDefault(require("../helpers/logger"));
// Middleware to check authorization header and decode JWT
const checkAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        res.status(401).json({ error: 'Authorization header is required' });
        return; // Return immediately after sending the response
    }
    const token = authHeader.split(' ')[1]; // Get token after 'Bearer'
    if (!token) {
        res.status(401).json({ error: 'Token is missing' });
        return; // Return immediately after sending the response
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'your_secret_key'); // Replace with your actual secret
        req.user = decoded; // Attach decoded user data to the request object
        next(); // Call next() to pass control to the next middleware or route handler
    }
    catch (error) {
        logger_1.default.error('Token verification failed:', error);
        res.status(403).json({ error: 'Invalid token' });
        return; // Ensure the response ends here
    }
};
exports.default = checkAuth;
