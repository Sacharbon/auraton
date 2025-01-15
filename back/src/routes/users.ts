import { Router } from "express";
import { createUser } from "@controllers/users/create";
import { updateUser } from "@controllers/users/update";
import { getUserById, getUsers } from "@controllers/users/fetch";
import { uploadFile } from "@middlewares/upload-file";

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', getUserById);
userRouter.post('/', uploadFile("picture", "uploads/users/"), createUser);
userRouter.patch('/:id', uploadFile("picture", "uploads/users/"), updateUser);

export default userRouter;
