import express from 'express'
import {config} from 'dotenv'
import courseRoutes from './routes/courseRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { ErrorHandler } from './middlewares/ErrorHandler.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
config({
    path:"./config/config.env"
})
const app = express()
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))

app.use(cookieParser())
app.use(cors({
    origin:process.env.FRONTEND_URI,
    credentials:true,
    methods:["GET","POST","PUT","DELETE"]
}))

app.use("/api/v1",courseRoutes)
app.use("/api/v1",userRoutes)

app.get("/",(req,res)=>{
    res.send("Hero Backend Working")
})

app.use(ErrorHandler)
export default app