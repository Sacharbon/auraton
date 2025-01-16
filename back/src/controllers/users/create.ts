import {Request, Response} from "express";
import {deleteUploadedFile, saveUploadedFile} from "@middlewares/upload-file";
import handleRequestError from "@errors/handler";
import CustomError, {CUSTOM_ERROR_TYPE} from "@errors/custom";
import User from "@models/user";
import {CODE_STATUS} from "@config/variables";
import {isValidFaceIdFormat} from "@utils/face-id";

export async function createUser(req: Request, res: Response)
{
    const { firstName, lastName, faceDescriptor } = req.body;
    const picture = req.file;

    // Required fields
    if (!firstName || !lastName || !faceDescriptor) {
        await deleteUploadedFile(picture);
        return handleRequestError(res, new CustomError(
            CUSTOM_ERROR_TYPE.BAD_REQUEST,
            "At least one of the required parameter is missing (firstName, lastName, faceDescriptor)."
        ));
    }

    let faceId = null;

    if (typeof faceDescriptor === "string") {
        try {
            faceId = JSON.parse(faceDescriptor);
            if (!isValidFaceIdFormat(faceId)) {
                await deleteUploadedFile(picture);
                return handleRequestError(res, new CustomError(
                    CUSTOM_ERROR_TYPE.BAD_REQUEST,
                    "The format of the field 'faceDescriptor' should be an array of array of float."
                ));
            }
        } catch (error) {
            return handleRequestError(res, new CustomError(
                CUSTOM_ERROR_TYPE.BAD_REQUEST,
                "The field 'faceDescriptor' should be an array of float."
            ));
        }
    } else {
        faceId = faceDescriptor;
    }

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

    if (picture)
        user.pictureUrl = await saveUploadedFile(picture, `${user.id}_picture`);

    try {
        user.roles = user.roles.concat(["Écuyer"]);
        await user.save();
    } catch (error) {
        return handleRequestError(res, error);
    }

    res.json(user).status(CODE_STATUS.SUCCESS);
}
