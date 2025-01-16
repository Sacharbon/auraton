import {Request, Response} from "express";
import handleRequestError from "@errors/handler";
import CustomError, {CUSTOM_ERROR_TYPE} from "@errors/custom";
import Comment from "@models/comment";
import {CODE_STATUS} from "@config/variables";

export default async function deleteComment(req: Request, res: Response)
{
    const { id } = req.params;

    if (!id) {
        return handleRequestError(res, new CustomError(
            CUSTOM_ERROR_TYPE.BAD_REQUEST,
            "At least one of the required parameters is missing. ('eventId', 'authorId')"
        ));
    }

    let comment = null;

    try {
        comment = await Comment.findByPk(id);
    } catch (error) {
        return handleRequestError(res, error);
    }

    if (!comment) {
        return handleRequestError(res, new CustomError(
            CUSTOM_ERROR_TYPE.NOT_FOUND,
            `The comment with id '${id}' does not exist.`
        ));
    }

    try {
        await comment.destroy();
    } catch (error) {
        return handleRequestError(res, error);
    }

    res.status(CODE_STATUS.SUCCESS).json({
        message: `Registration of the user '${id}' has been removed.`
    });
}
