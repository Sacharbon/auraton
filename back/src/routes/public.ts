import path from "path";
import express, {Router} from "express";

const publicRouter = Router();

publicRouter.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

export default publicRouter;
