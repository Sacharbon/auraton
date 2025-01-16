import {Request, Response} from "express";
import handleRequestError from "@errors/handler";
import {deleteUploadedFile, saveUploadedFile} from "@middlewares/upload-file";
import CustomError, {CUSTOM_ERROR_TYPE} from "@errors/custom";
import User from "@models/user";
import Comment from "@models/comment";
import Event from "@models/event";
import {CODE_STATUS} from "@config/variables";
import Registration from "@models/registration";

export default async function createEvent(req: Request, res: Response)
{
    const { authorId, label, title, description, scheduledAt } = req.body;
    const image = req.file;

    if (!authorId || !label || !title || !description || !image || !scheduledAt) {
        await deleteUploadedFile(image);
        return handleRequestError(res, new CustomError(
            CUSTOM_ERROR_TYPE.BAD_REQUEST,
            "At least one of the required parameter is missing (authorId, label, title, description, image, scheduledAt)."
        ));
    }

    let author = null;

    try {
        author = await User.findByPk(authorId);
    } catch (error) {
        await deleteUploadedFile(image);
        return handleRequestError(res, error);
    }

    if (!author) {
        await deleteUploadedFile(image);
        return handleRequestError(res, new CustomError(
            CUSTOM_ERROR_TYPE.NOT_FOUND,
            `No user with the id '${authorId}' has been found.`
        ));
    }

    let event = null;
    try {
        event = await Event.create({
            label,
            title,
            description,
            scheduledAt
        });
    } catch (error) {
        await deleteUploadedFile(image);
        return handleRequestError(res, error);
    }

    event.authorId = parseInt(authorId);

    try {
        event.imageUrl = await saveUploadedFile(image, event.id.toString());
    } catch (error) {
        await deleteUploadedFile(image);
        return handleRequestError(res, error);
    }

    try {
        await event.save();
    } catch (error) {
        return handleRequestError(res, error);
    }

    try {
        event = await Event.findByPk(event.id, {
            attributes: {
                exclude: ['authorId']
            },
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
        });
    } catch (error) {
        return handleRequestError(res, error);
    }

    res.status(CODE_STATUS.SUCCESS).json(event);
}