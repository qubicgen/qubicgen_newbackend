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
import { Request,Response } from 'express'
dotenv.config()
const port=9098


const app=express()
app.use(express.json())
app.use(cors({
  origin: [
    'https://qubicgen.com',
    'http://qubicgen.com',
    'http://localhost:5173',
    'https://qg.vidyantra-dev.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use('/qubicgen',careerRouter)
app.use('/qubicgen',getInTouchRouter)
app.use('/qubicgen',projectRouter)
app.use('/qubicgen',studentRouter)
app.use('/qubicgen',queryRouter)
app.use('/qubicgen',authenticationRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/uploads', express.static('uploads'));

app.get('/',(req:Request,res:Response)=>{
  res.status(200).send('Hello from qubicgen backend')
})
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}, api documentation available at http://localhost:${port}/api-docs`);
  });