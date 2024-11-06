import express from 'express'
import dotenv from 'dotenv'
import careerRouter from './routes/careerRouter'
import getInTouchRouter from './routes/getInTouchRouter'
import projectRouter from './routes/projectRouter'
import studentRouter from './routes/studentRouter'
import queryRouter from './routes/queryRouter'
dotenv.config()
const port=9098


const app=express()
app.use('/qubicgen',careerRouter)
app.use('/qubicgen',getInTouchRouter)
app.use('/qubicgen',projectRouter)
app.use('/qubicgen',studentRouter)
app.use('/qubicgen',queryRouter)

app.listen(port,()=>{
    console.log('hello from backend qubicgen')
})