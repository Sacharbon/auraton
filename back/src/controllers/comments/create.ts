import {Request, Response} from "express";
import handleRequestError from "@errors/handler";
import CustomError, {CUSTOM_ERROR_TYPE} from "@errors/custom";
import Comment from "@models/comment";
import {CODE_STATUS} from "@config/variables";

export default async function postComment(req: Request, res: Response)
{
    const { id } = req.params;
    const { authorId, comment } = req.body;

    if (!id || !authorId || !comment) {
        return handleRequestError(res, new CustomError(
            CUSTOM_ERROR_TYPE.BAD_REQUEST,
            "At least one of the required parameters / fields is missing. (id, authorId, comment)"
        ));
    }

    let commentEntity = null;
    try {
        commentEntity = await Comment.create({
            authorId,
            eventId: id,
            comment,
            like: 0
        });
    } catch (error) {
        return handleRequestError(res, error);
    }

    res.status(CODE_STATUS.SUCCESS).json(commentEntity);
}
