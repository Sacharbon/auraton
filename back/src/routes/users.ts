import {Router} from "express";
import {getUserById, getUsers} from "@controllers/users/fetch";

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', getUserById);

export default userRouter;
