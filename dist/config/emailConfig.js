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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyConnection = exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
// Create the transporter with types for the environment variables
const transporter = nodemailer_1.default.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: true, // true for port 465
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    debug: true // Enable debug logs
});
exports.transporter = transporter;
// Verify the connection configuration
const verifyConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield transporter.verify();
        console.log('SMTP connection verified successfully');
        return true;
    }
    catch (error) {
        console.error('SMTP connection error:', error);
        return false;
    }
});
exports.verifyConnection = verifyConnection;
// Verify connection when the server starts
verifyConnection();
