import { Router } from 'express';
import {
    getContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact
} from '../controllers/contactController';

const router = Router();

// GET all contacts
router.get('/', getContacts as any);

// POST create new contact
router.post('/', createContact as any);

// GET single contact by ID
router.get('/:id', getContactById as any);

// PUT update contact
router.put('/:id', updateContact as any);

// DELETE contact
router.delete('/:id', deleteContact as any);

export default router; 