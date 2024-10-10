import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import todoRoute from '../Backend/routes/todo.routes.js'
import userRotue from "../Backend/routes/user.routes.js"
import cors from "cors"
import cookieParser from "cookie-parser";
const app = express();
dotenv.config();



// Database connection code 
const DB_URI=process.env.MONGODB_URI
 try{
    await mongoose.connect(DB_URI)
    console.log("Connected to mongoDb");
} catch (error) {
    console.log(error);
}

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: ["content-type", "Authorization"]
}))

// Todo routes code

app.use('/todo', todoRoute);
app.use('/user', userRotue)




const PORT=process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`server started path http://localhost:${PORT}`);
})