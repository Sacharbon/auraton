import {Request, Response} from "express";
import handleRequestError from "@errors/handler";
import {deleteUploadedFile, saveUploadedFile} from "@middlewares/upload-file";
import CustomError, {CUSTOM_ERROR_TYPE} from "@errors/custom";
import Event from "@models/event";
import Comment from "@models/comment";
import User from "@models/user";
import {CODE_STATUS} from "@config/variables";
import Registration from "@models/registration";

export default async function updateEvent(req: Request, res: Response)
{
    const { userId, label, title, description, likes, scheduledAt } = req.body;
    const image = req.file;
    const { id } = req.params;

    if (!id || !userId) {
        await deleteUploadedFile(image);
        return handleRequestError(res, new CustomError(
            CUSTOM_ERROR_TYPE.BAD_REQUEST,
            "At least one of the required parameter or field is missing ('id', 'userId')."
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
        await deleteUploadedFile(image);
        return handleRequestError(res, error);
    }

    if (!event) {
        await deleteUploadedFile(image);
        return handleRequestError(res, new CustomError(
            CUSTOM_ERROR_TYPE.NOT_FOUND,
            `The event with the id '${id}' does not exist`
        ));
    }

    if (event.author.id !== parseInt(userId)) {
        await deleteUploadedFile(image);
        return handleRequestError(res, new CustomError(CUSTOM_ERROR_TYPE.UNAUTHORIZED));
    }

    event.label = label ?? event.label;
    event.title = title ?? event.title;
    event.description = description ?? event.description;
    event.scheduledAt = scheduledAt ?? event.scheduledAt;

    if (likes && !isNaN(parseInt(likes)))
        event.likes = parseInt(likes) ?? event.likes;
    if (image)
        event.imageUrl = await saveUploadedFile(image, id);

    try {
        await event.save();
    } catch (error) {
        return handleRequestError(res, error);
    }

    res.status(CODE_STATUS.SUCCESS).json(event);
}
