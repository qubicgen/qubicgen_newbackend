import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import logger from '../helpers/logger';

// Extend the Request interface to include the user property
interface CustomRequest extends Request {
  user?: any; // Specify the exact type based on your JWT payload, e.g., { id: string, email: string }
}

// Middleware to check authorization header and decode JWT
const checkAuth = (req: CustomRequest, res: Response, next: NextFunction): void => {
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
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key'); // Replace with your actual secret
    req.user = decoded; // Attach decoded user data to the request object
    next(); // Call next() to pass control to the next middleware or route handler
  } catch (error) {
    logger.error('Token verification failed:', error);
    res.status(403).json({ error: 'Invalid token' });
    return; // Ensure the response ends here
  }
};

export default checkAuth;
