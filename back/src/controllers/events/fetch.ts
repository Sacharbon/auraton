import {Request, Response} from "express";
import handleRequestError from "@errors/handler";
import Event from "@models/event";
import {CODE_STATUS} from "@config/variables";

export async function getEvents(req: Request, res: Response)
{
    let events = null;

    try {
        events = await Event.findAll();
    } catch (error) {
        return handleRequestError(res, error);
    }

    res.status(CODE_STATUS.SUCCESS).json(events);
}
