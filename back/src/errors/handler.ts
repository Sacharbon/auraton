import {Error} from "sequelize";
import {Response} from 'express';
import {CODE_STATUS, SEQUELIZE_ERRORS} from "@config/variables";
import CustomError, {CUSTOM_ERROR_TYPE} from "@errors/custom";

function handleSequelizeErrors(res: Response, error: Error, errorMessages?: ErrorMessagesProps)
{
    switch (error.name) {
        case SEQUELIZE_ERRORS.UNIQUE_CONSTRAINT:
            res.status(CODE_STATUS.BAD_REQUEST).json({
                message: errorMessages?.uniqueConstraint ?? "Bad request."
            });
            break;
        case SEQUELIZE_ERRORS.VALIDATION:
            res.status(CODE_STATUS.BAD_REQUEST).json({
                message: errorMessages?.validation ?? "Bad request."
            });
            break;
        case SEQUELIZE_ERRORS.DATABASE:
            res.status(CODE_STATUS.INTERNAL).json({
                message: "An internal error occurred..."
            });
            console.error("DATABASE error occurred: ", error);
            break;
        case SEQUELIZE_ERRORS.CONNECTION_REFUSED:
            res.status(CODE_STATUS.INTERNAL).json({
                message: "An internal error occurred..."
            });
            console.error("DB_CONNECTION error occurred: ", error.name, "\nFull error can be found here:\n", error);
            break;
        default:
            res.status(CODE_STATUS.INTERNAL).json({
                message: "An internal error occurred..."
            });
            console.error("UNKNOWN error occurred: ", error.name, "\nFull error can be found here:\n", error);
            break;
    }
    return;
}

function handleCustomError(res: Response, error: CustomError, errorMessage?: ErrorMessagesProps) : void
{
    switch (error.type) {
        case CUSTOM_ERROR_TYPE.UNAUTHORIZED:
            res.status(CODE_STATUS.UNAUTHORIZED).json({
                message: "You are not allowed to do this."
            });
            console.error(error.message);
            break;

        case CUSTOM_ERROR_TYPE.NOT_FOUND:
            res.status(CODE_STATUS.NOT_FOUND).json({
                message: error.message
            });
            break;

        case CUSTOM_ERROR_TYPE.BAD_REQUEST:
        default:
            res.status(CODE_STATUS.BAD_REQUEST).json({
                message: error.message
            });
            break;
    }
}

export default function handleRequestError(res: Response, error: Error|CustomError|any, errorMessages?: ErrorMessagesProps) : void
{
    if (error instanceof Error)
        return handleSequelizeErrors(res, error, errorMessages);

    if (error instanceof CustomError)
        return handleCustomError(res, error, errorMessages);

    res.status(CODE_STATUS.INTERNAL).json({
        "message": "An internal error occurred..."
    });
    if (errorMessages?.logMessage) {
        console.error("An error occurred with a custom message: ", errorMessages.logMessage);
    } else {
        console.error("A NON-SEQUELIZE error occurred: ", error);
    }
    return;
}

interface ErrorMessagesProps {
    validation?: string;
    uniqueConstraint?: string;
    logMessage?: string;
}