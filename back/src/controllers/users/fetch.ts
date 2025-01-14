import {Request, Response} from "express";
import User from "@models/user";
import handleRequestError from "@errors/handler";
import CustomError, {CUSTOM_ERROR_TYPE} from "@errors/custom";
import {CODE_STATUS} from "@config/variables";


export function getUsers(req: Request, res: Response)
{
    let users = null;

    try {
        users = User.findAll();
    } catch (error) {
        return handleRequestError(res, error);
    }

    if (!users)
        users = [];

    res.json({
        users
    }).status(CODE_STATUS.SUCCESS);
}

export function getUserById(req: Request, res: Response)
{
    const { id } = req.params;
    let user = null;

    if (!id) {
        return handleRequestError(res, new CustomError(
            CUSTOM_ERROR_TYPE.BAD_REQUEST,
            `The parameter 'id' is missing.`
        ));
    }

    try {
        user = User.findByPk(id);
    } catch (error) {
        return handleRequestError(res, error);
    }

    if (!user) {
        return handleRequestError(res, new CustomError(
            CUSTOM_ERROR_TYPE.NOT_FOUND,
            `The user with id '${id}' does not exist.`
        ));
    }

    res.json({
        ...user
    }).status(CODE_STATUS.SUCCESS);
}
