import {Request, Response} from "express";
import handleRequestError from "@errors/handler";
import CustomError, {CUSTOM_ERROR_TYPE} from "@errors/custom";
import Registration from "@models/registration";
import {CODE_STATUS} from "@config/variables";
import User from "@models/user";
import Event from "@models/event";
import {updateUserRole} from "@utils/roles";

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
            },
            include: [
                {
                    model: User,
                    as: "user"
                }
            ]
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

    let event = null;
    let user = null;
    let users = null;

    try {
        event = await Event.findByPk(eventId);
        user = await User.findByPk(userId);
        users = await User.findAll()
    } catch (error) {
        return handleRequestError(res, error);
    }

    if (!event || !user) {
        return handleRequestError(res, new CustomError(
            CUSTOM_ERROR_TYPE.NOT_FOUND,
            `The event with id '${eventId}' or the user with id '${userId}' does not exist.`
        ));
    }

    event.author.aura -= 1_000;
    user.aura -= 1_000;

    await updateUserRole(user, users);
    await updateUserRole(event.author, users);

    try {
        await event.author.save();
        await user.save();
        await registration.destroy();
    } catch (error) {
        return handleRequestError(res, error);
    }

    res.status(CODE_STATUS.SUCCESS).json({
        message: `Registration of the user '${userId}' for the event '${eventId}' has been removed.`
    });
}
