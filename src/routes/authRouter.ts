import { Router } from 'express';
import Authentication from '../controllers/authenticationController';

const router = Router();

// Explicitly bind the method in the route file
router.post('/login', Authentication.userLogin);
router.post('/register',Authentication.userRegister)
export default router;
