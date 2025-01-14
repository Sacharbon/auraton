import {Request, Response} from "express";

export async function createUser(req: Request, res: Response)
{
    const { firstName, lastName, faceDescriptor } = req.body;

}
