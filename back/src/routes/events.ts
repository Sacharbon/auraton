import { Router } from "express";
import { uploadFile } from "@middlewares/upload-file";
import createEvent from "@controllers/events/create";

const eventRouter = Router();

eventRouter.post('/', uploadFile('image', 'uploads/events/'), createEvent);

export default eventRouter;
