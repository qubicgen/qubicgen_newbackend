import nodemailer from 'nodemailer';

// Define transporter options with proper types
interface TransporterOptions {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  debug: boolean;
}

// Create the transporter with types for the environment variables
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST!,
    port: parseInt(process.env.EMAIL_PORT!),
    secure: true, // true for port 465
    auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASS!
    },
    debug: true // Enable debug logs
} as TransporterOptions);

// Verify the connection configuration
const verifyConnection = async (): Promise<boolean> => {
    try {
        await transporter.verify();
        console.log('SMTP connection verified successfully');
        return true;
    } catch (error) {
        console.error('SMTP connection error:', error);
        return false;
    }
};

// Verify connection when the server starts
verifyConnection();

// Export transporter and verifyConnection
export { transporter, verifyConnection };
