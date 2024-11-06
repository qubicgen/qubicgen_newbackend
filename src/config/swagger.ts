import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Vidyantra App - Enrollments Microservice API Documentation',
      version: '1.0.0',
      description: 'API documentation for the Enrollments Microservice of the Vidyantra Application',
      contact: {
        name: 'Vidyantra Dev Team',
        email: 'support@vidyantra.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000', // Change this URL to the actual service URL if hosted
        description: 'Local Development Server',
      },
      {
        url: 'https://api.vidyantra.com/enrollments',
        description: 'Production Server for Settings Microservice',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Define the path to the route files
};
 const swaggerSpec = swaggerJsdoc(swaggerOptions);
export default swaggerSpec