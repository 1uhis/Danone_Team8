import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'

import {notFound, errorHandler} from './src/middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import productRoutes from './src/routes/productionRoutes.js'
import userRoutes from "./src/routes/userRoutes.js";
import uploadData from "./src/routes/uploadData.js";
import uploadRoutes from "./src/routes/uploadRoutes.js";

let envPath;

if (process.env.NODE_ENV === "development") {
    envPath = path.resolve(process.cwd(), ".env.development");
} else if (process.env.NODE_ENV === "production") {
    envPath = path.resolve(process.cwd(), ".env.production");
} else {
    envPath = path.resolve(process.cwd(), ".env.development");
}

dotenv.config({
    path: envPath,
});


connectDB()


const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(cors({
    origin: '*',
    Method: ['GET', 'POST', 'PUT', 'DELETE']
}))

app.use(express.json())

app.use('/api/display', productRoutes)
app.use('/api/uploadData', uploadData)
app.use('/api/users', userRoutes)
app.use('/api/upload', uploadRoutes)

const __dirname = path.resolve()

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use('/public', express.static(path.join(__dirname, '/frontend/public')))
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
} else {
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5001

app.listen(
    PORT,()=>{
        console.log(
            `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
        )
    })
