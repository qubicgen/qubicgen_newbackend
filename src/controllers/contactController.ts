import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

interface Contact {
    id: string;
    registrationDate: string;
    name: string;
    email: string;
    whatsapp: string;
    college: string;
    studentEmail: string;
    year: string;
    domain: string;
    amountPaid: number;
    totalFees: number;
    preferredMonth: string;
    referrals: Array<{ name: string; contact: string }>;
    balanceFees: number;
    discount: number | string;
}

let contacts: Contact[] = [];

// Get all contacts
export const getContacts = (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
};

// Get single contact
export const getContactById = (req: Request, res: Response, next: NextFunction) => {
    try {
        const contact = contacts.find(c => c.id === req.params.id);
        contact ? res.json(contact) : res.status(404).json({ message: 'Contact not found' });
    } catch (error) {
        next(error);
    }
};

// Create new contact
export const createContact = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const requiredFields = ['name', 'email', 'whatsapp', 'college', 'studentEmail'];
        const missingField = requiredFields.find(field => !req.body[field]);
        
        if (missingField) {
            return res.status(400).json({ message: `${missingField} is required` });
        }

        const newContact: Contact = {
            id: uuidv4(),
            registrationDate: new Date().toISOString(),
            balanceFees: (req.body.totalFees || 0) - (req.body.amountPaid || 0),
            ...req.body,
            referrals: req.body.referrals || [],
            discount: req.body.discount || 0
        };

        contacts.push(newContact);
        res.status(201).json(newContact);
    } catch (error) {
        next(error);
    }
};

// Update contact
export const updateContact = (req: Request, res: Response, next: NextFunction) => {
    try {
        const index = contacts.findIndex(c => c.id === req.params.id);
        if (index === -1) return res.status(404).json({ message: 'Contact not found' });

        const updatedContact = {
            ...contacts[index],
            ...req.body,
            balanceFees: (req.body.totalFees || contacts[index].totalFees) - 
                        (req.body.amountPaid || contacts[index].amountPaid),
            id: req.params.id
        };

        contacts[index] = updatedContact;
        res.json(updatedContact);
    } catch (error) {
        next(error);
    }
};

// Delete contact
export const deleteContact = (req: Request, res: Response, next: NextFunction) => {
    try {
        const index = contacts.findIndex(c => c.id === req.params.id);
        if (index === -1) return res.status(404).json({ message: 'Contact not found' });
        
        contacts = contacts.filter(c => c.id !== req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}; 