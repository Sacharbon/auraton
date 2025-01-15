import dotenv from "dotenv";

dotenv.config();

const VAR_LENGTH = {
    NAME: process.env.NAME_LENGTH
}

enum SEQUELIZE_ERRORS {
    UNIQUE_CONSTRAINT="SequelizeUniqueConstraintError",
    VALIDATION="SequelizeValidationError",
    DATABASE="SequelizeDatabaseError",
    CONNECTION_REFUSED="SequelizeConnectionRefusedError",
}

enum CODE_STATUS {
    SUCCESS=200,
    REDIRECT=301,
    BAD_REQUEST=400,
    UNAUTHORIZED=401,
    NOT_FOUND=404,
    INTERNAL=500
}

export { VAR_LENGTH, SEQUELIZE_ERRORS, CODE_STATUS };