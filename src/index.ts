import express from 'express'
import dotenv from 'dotenv'
import careerRouter from './routes/careerRouter'
import getInTouchRouter from './routes/getInTouchRouter'
import projectRouter from './routes/projectRouter'
import studentRouter from './routes/studentRouter'
import queryRouter from './routes/queryRouter'
import authenticationRouter from './routes/authRouter'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './config/swagger'
import cors from 'cors'
dotenv.config()
const port=9098


const app=express()
app.use(express.json())
app.use('/qubicgen',careerRouter)
app.use('/qubicgen',getInTouchRouter)
app.use('/qubicgen',projectRouter)
app.use('/qubicgen',studentRouter)
app.use('/qubicgen',queryRouter)
app.use('/qubicgen',authenticationRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// app.use(cors({
//     origin: ['http://localhost:5173', 'http://3.111.33.249:3000', 'http://3.111.33.249:3000/','https://vidyantra-dev.com','http://localhost:4000/sms/'],  // Allow requests from these origins
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Specify which methods are allowed
//     allowedHeaders: ['Content-Type', 'Authorization'],  // Specify which headers are allowed
//     credentials: true  // Allow cookies to be sent with the request
//   }));

app.use(cors({
  origin: 'http://localhost:5173', // or use '*' to allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


  app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}, api documentation available at http://localhost:${port}/api-docs`);
  });