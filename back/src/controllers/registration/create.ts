import {Request, Response} from "express";
import handleRequestError from "@errors/handler";
import Event from "@models/event";
import User from "@models/user";
import Comment from "@models/comment";
import CustomError, {CUSTOM_ERROR_TYPE} from "@errors/custom";
import Registration from "@models/registration";
import {CODE_STATUS} from "@config/variables";

export default async function registerUserToEvent(req: Request, res: Response)
{
    const { id: eventId } = req.params;
    const { userId } = req.body;

    if (!eventId || !userId) {
        return handleRequestError(res, new CustomError(
            CUSTOM_ERROR_TYPE.BAD_REQUEST,
            "At least one of the required parameters/fields is missing. (id, userId)"
        ));
    }

    let event = null;
    try {
        event = await Event.findByPk(eventId, {
            attributes: { exclude: ['authorId'] },
            include: [
                {
                    model: User,
                    as: "author"
                },
                {
                    model: Comment,
                    as: "comments"
                }
            ]
        });
    } catch (error) {
        return handleRequestError(res, error);
    }

    if (!event) {
        return handleRequestError(res, new CustomError(
            CUSTOM_ERROR_TYPE.NOT_FOUND,
            `The event with id '${eventId}' does not exist.`
        ));
    }

    let user = null;
    try {
        user = await User.findByPk(userId);
    } catch (error) {
        return handleRequestError(res, error);
    }

    if (!user) {
        return handleRequestError(res, new CustomError(
            CUSTOM_ERROR_TYPE.NOT_FOUND,
            `The user with id '${userId}' does not exist.`
        ));
    }

    try {
        await Registration.create({
            userId,
            eventId
        });
    } catch (error) {
        return handleRequestError(res, error);
    }

    try {
        event = await Event.findByPk(eventId, {
            attributes: { exclude: ['authorId'] },
            include: [
                {
                    model: User,
                    as: "author"
                },
                {
                    model: Comment,
                    as: "comments"
                },
                {
                    model: Registration,
                    as: "registeredUsers",
                    attributes: { exclude: ['eventId', 'userId'] },
                    include: [
                        {
                            model: User,
                            as: "user"
                        }
                    ]
                }
            ]
        });
    } catch (error) {
        return handleRequestError(res, error);
    }

    if (!event) {
        return handleRequestError(res, new CustomError(
            CUSTOM_ERROR_TYPE.NOT_FOUND,
            `The event with id '${eventId}' cannot be found.`
        ));
    }

    res.status(CODE_STATUS.SUCCESS).json(event);
}
