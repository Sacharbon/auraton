import 'module-alias/register';
import express, { Request, Response } from 'express';
import dotenv from "dotenv";
import { initializeDatabase } from "@config/database";
import userRouter from "@routes/users";

dotenv.config();

const app = express();
const port = process.env.API_PORT ?? 3000;

initializeDatabase().then(() => {
    console.log("Database initialized !");
});

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.use('/users/', userRouter);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
