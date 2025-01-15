import { Router } from "express";
import { uploadFile } from "@middlewares/upload-file";
import createEvent from "@controllers/events/create";
import {getEvents} from "@controllers/events/fetch";

const eventRouter = Router();

eventRouter.post('/', uploadFile('image', 'uploads/events/'), createEvent);
eventRouter.get('/', getEvents);

export default eventRouter;
