import { Router } from "express";
import { uploadFile } from "@middlewares/upload-file";
import createEvent from "@controllers/events/create";
import { getEventById, getEvents } from "@controllers/events/fetch";
import updateEvent from "@controllers/events/update";
import registerUserToEvent from "@controllers/registration/create";
import unregisterUserFromEvent from "@controllers/registration/delete";
import postComment from "@controllers/comments/create";
import deleteComment from "@controllers/comments/delete";

const eventRouter = Router();

eventRouter.post('/', uploadFile('image', 'uploads/events/'), createEvent);
eventRouter.get('/', getEvents);
eventRouter.get('/:id', getEventById);
eventRouter.patch('/:id', uploadFile('image', 'uploads/events/'), updateEvent);
eventRouter.post('/:id/register', registerUserToEvent);
eventRouter.post('/:id/comment', postComment);
eventRouter.delete('/:eventId/comment/:authorId', deleteComment);
eventRouter.delete('/:eventId/unregister/:userId', unregisterUserFromEvent);

export default eventRouter;
