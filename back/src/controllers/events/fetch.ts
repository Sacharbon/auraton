import {Request, Response} from "express";
import handleRequestError from "@errors/handler";
import Event from "@models/event";
import {CODE_STATUS} from "@config/variables";
import User from "@models/user";
import Registration from "@models/registration";
import Comment from "@models/comment";
import CustomError, {CUSTOM_ERROR_TYPE} from "@errors/custom";

export async function getEvents(req: Request, res: Response)
{
    let events = null;

    try {
        events = await Event.findAll({
            attributes: { exclude: ['authorId']},
            include: [
                {
                    model: Comment,
                    as: "comments"
                },
                {
                    model: User,
                    as: "author",
                },
                {
                    model: Registration,
                    as: "registeredUsers",
                    attributes: { exclude: ['eventId', 'userId', 'createdAt', 'updatedAt'] },
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

    try {
        events.map(async (event) => {
            event.comments = await Comment.findAll({
                where: {
                    eventId: event.id
                }
            })
            return event;
        });
    } catch (error) {
        return handleRequestError(res, error);
    }

    res.status(CODE_STATUS.SUCCESS).json(events);
}


export async function getEventById(req: Request, res: Response)
{
    const { id } = req.params;

    if (!id) {
        return handleRequestError(res, new CustomError(
            CUSTOM_ERROR_TYPE.BAD_REQUEST,
            "The parameter 'id' is missing in the url"
        ));
    }

    let event = null;
    try {
        event = await Event.findByPk(id, {
            attributes: { exclude: ['authorId'] },
            include: [
                {
                    model: Comment,
                    as: "comments"
                },
                {
                    model: User,
                    as: "author"
                },
                {
                    model: Registration,
                    as: "registeredUsers",
                    attributes: { exclude: ['eventId', 'userId', 'createdAt', 'updatedAt'] },
                    include: [
                        {
                            model: User,
                            as: "user"
                        }
                    ]
                }
            ]
        })
    } catch (error) {
        return handleRequestError(res, error);
    }

    if (!event) {
        return handleRequestError(res, new CustomError(
            CUSTOM_ERROR_TYPE.NOT_FOUND,
            `The event with id '${id}' does not exist.`
        ));
    }

    res.status(CODE_STATUS.SUCCESS).json(event);
}
