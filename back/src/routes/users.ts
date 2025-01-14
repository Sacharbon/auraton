import {Router} from "express";
import {getUserById, getUsers} from "@controllers/users/fetch";
import {createUser} from "@controllers/users/create";
import {uploadFile} from "@middlewares/upload-file";

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', getUserById);
userRouter.post('/', uploadFile("picture", "uploads/users/"), createUser);

export default userRouter;
