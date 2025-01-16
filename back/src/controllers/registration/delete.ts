import {Request, Response} from "express";
import handleRequestError from "@errors/handler";
import CustomError, {CUSTOM_ERROR_TYPE} from "@errors/custom";
import Registration from "@models/registration";
import {CODE_STATUS} from "@config/variables";

export default async function unregisterUserFromEvent(req: Request, res: Response)
{
    const { eventId, userId } = req.params;

    if (!eventId || !userId) {
        return handleRequestError(res, new CustomError(
            CUSTOM_ERROR_TYPE.BAD_REQUEST,
            "At least one of the required parameters is missing. ('eventId', 'userId')"
        ));
    }

    let registration = null;

    try {
        registration = await Registration.findOne({
            where: {
                eventId,
                userId
            }
        });
    } catch (error) {
        return handleRequestError(res, error);
    }

    if (!registration) {
        return handleRequestError(res, new CustomError(
            CUSTOM_ERROR_TYPE.NOT_FOUND,
            `The registration on the event '${eventId}' for the user '${userId}' does not exist.`
        ));
    }

    try {
        await registration.destroy();
    } catch (error) {
        return handleRequestError(res, error);
    }

    res.status(CODE_STATUS.SUCCESS).json({
        message: `Registration of the user '${userId}' for the event '${eventId}' has been removed.`
    });
}
