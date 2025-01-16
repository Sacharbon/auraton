import {Request, Response} from "express";
import {deleteUploadedFile, saveUploadedFile} from "@middlewares/upload-file";
import handleRequestError from "@errors/handler";
import CustomError, {CUSTOM_ERROR_TYPE} from "@errors/custom";
import User from "@models/user";
import { CODE_STATUS } from "@config/variables";
import { isValidFaceIdFormat } from "@utils/face-id";
import { isValidRolesFormat } from "@utils/roles";

export async function updateUser(req: Request, res: Response)
{
    const { id } = req.params;
    const { roles, faceDescriptor } = req.body;
    const picture = req.file;

    if (!id || isNaN(parseFloat(id))) {
        await deleteUploadedFile(picture);
        return handleRequestError(res, new CustomError(
            CUSTOM_ERROR_TYPE.BAD_REQUEST,
            "The field 'id' should be an integer."
        ));
    }

    let user = null;
    try {
        user = await User.findByPk(id);
    } catch (error) {
        await deleteUploadedFile(picture);
        return handleRequestError(res, error);
    }

    // User not found
    if (!user) {
        await deleteUploadedFile(picture);
        return handleRequestError(res, new CustomError(
            CUSTOM_ERROR_TYPE.BAD_REQUEST,
            `No user with the id '${id}' have been found.`
        ));
    }

    // Update face descriptor
    if (faceDescriptor) {
        let faceId = null;

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
            await deleteUploadedFile(picture);
            return handleRequestError(res, new CustomError(
                CUSTOM_ERROR_TYPE.BAD_REQUEST,
                "The field 'faceDescriptor' should be an array of float."
            ));
        }

        user.faceDescriptor = user.faceDescriptor.concat(faceId);
    }

    // Update roles
    if (roles) {
        let formattedRoles = null;

        try {
            formattedRoles = JSON.parse(roles);
            if (!isValidRolesFormat(formattedRoles)) {
                await deleteUploadedFile(picture);
                return handleRequestError(res, new CustomError(
                    CUSTOM_ERROR_TYPE.BAD_REQUEST,
                    "The format of the field 'roles' should be an array of string."
                ));
            }
        } catch (error) {
            await deleteUploadedFile(picture);
            return handleRequestError(res, new CustomError(
                CUSTOM_ERROR_TYPE.BAD_REQUEST,
                "The field 'roles' should be an array of string."
            ));
        }
        user.roles = [...new Set(user.roles.concat(roles))]
    }

    // Update picture
    if (picture) {
        try {
            user.pictureUrl = await saveUploadedFile(picture, `${user.id}_picture`);
        } catch (error) {
            await deleteUploadedFile(picture);
            return handleRequestError(res, error);
        }
    }

    // Save user
    try {
        await user.save();
    } catch (error) {
        return handleRequestError(res, error);
    }

    res.json({...(user.dataValues)}).status(CODE_STATUS.SUCCESS);
}
