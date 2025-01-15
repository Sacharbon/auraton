import {Request, Response} from "express";
import {deleteUploadedFile, saveUploadedFile} from "@middlewares/upload-file";
import handleRequestError from "@errors/handler";
import CustomError, {CUSTOM_ERROR_TYPE} from "@errors/custom";
import User from "@models/user";
import {CODE_STATUS} from "@config/variables";

export async function createUser(req: Request, res: Response)
{
    const { firstName, lastName, faceDescriptor } = req.body;
    const picture = req.file;

    console.log(req.body);
    // Required fields
    if (!firstName || !lastName || !faceDescriptor) {
        await deleteUploadedFile(picture);
        return handleRequestError(res, new CustomError(
            CUSTOM_ERROR_TYPE.BAD_REQUEST,
            "At least one of the required parameter is missing (firstName, lastName, faceDescriptor)."
        ));
    }

    let faceId = faceDescriptor;

    // Create user
    let user = null;
    let created = false;
    try {
        [user, created] = await User.findOrCreate({
            where: {
                firstName,
                lastName,
                faceDescriptor: faceId
            },
            defaults: {
                firstName,
                lastName,
                faceDescriptor: faceId
            }
        });
    } catch (error) {
        return handleRequestError(res, error);
    }

    if (!created) {
        return handleRequestError(res, new CustomError(
            CUSTOM_ERROR_TYPE.BAD_REQUEST,
            "This user already exists."
        ));
    }

    if (picture) {
        try {
            user.pictureUrl = await saveUploadedFile(picture, `${user.id}_picture`);
            await user.save();
        } catch (error) {
            return handleRequestError(res, error);
        }
    }

    res.json({...(user.dataValues)}).status(CODE_STATUS.SUCCESS);
}
