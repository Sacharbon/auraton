import 'module-alias/register';
import express, { Request, Response } from 'express';
import dotenv from "dotenv";
import { initializeDatabase } from "@config/database";
import userRouter from "@routes/users";
import eventRouter from "@routes/events";
import cors from "cors";

dotenv.config();

const port = process.env.API_PORT ?? 3000;
const app = express();

const corsOptions = {
    origin: process.env.FRONT_URL
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initializeDatabase().then(() => {
    console.log("Database initialized !");
});

app.use('/users/', userRouter);
app.use('/events/', eventRouter);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
