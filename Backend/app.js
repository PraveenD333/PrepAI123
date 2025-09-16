import dotenv from 'dotenv';
dotenv.config({quiet:true});
import express from 'express';
import cors from 'cors';
import path from 'path';
import {dirname} from 'path';
import { fileURLToPath } from 'url';

import userRoutes from './Routes/user.router.js'
import sessionRoutes from './Routes/session.router.js'
import questionRoutes from './Routes/question.router.js'
import { protect } from './Middleware/auth.midd.js';
import { generateConceptExplanation, generateInterviewQuestions } from './Controllers/ai.cont.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app=express();

app.use(cors({
    origin:"*",
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders: ["Content-type","Authorization"],
}));

// Middleware
app.use(express.json())

//Routes
app.use("/api/user",userRoutes)
app.use("/api/sessions",sessionRoutes)
app.use("/api/questions",questionRoutes)

app.use("/api/ai/generate-questions",protect,generateInterviewQuestions)
app.use("/api/ai/generate-explanation",protect,generateConceptExplanation)

// Serve Uploads folder
app.use("/uploads",express.static(path.join(__dirname,"uploads"),{}));

export default app;