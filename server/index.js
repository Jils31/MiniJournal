import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import authRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser'
import entryRouter from './routes/entry.route.js';

const app = express()
const PORT = 3000

dotenv.config()
app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRouter)
app.use('/api/entry', entryRouter)

connectDb()

app.get('/', (req,res)=>{
    res.send("Hello this is my mini journal project")
})

app.listen(PORT, ()=>console.log(`Server running on ${PORT}`))

