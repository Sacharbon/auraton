import { Router } from "express";
import { uploadFile } from "@middlewares/upload-file";
import createEvent from "@controllers/events/create";
import { getEventById, getEvents } from "@controllers/events/fetch";
import updateEvent from "@controllers/events/update";

const eventRouter = Router();

eventRouter.post('/', uploadFile('image', 'uploads/events/'), createEvent);
eventRouter.get('/', getEvents);
eventRouter.get('/:id', getEventById);
eventRouter.patch('/:id', uploadFile('image', 'uploads/events/'), updateEvent);

export default eventRouter;
