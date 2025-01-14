import dotenv from "dotenv";

dotenv.config();

const VAR_LENGTH = {
    NAME: process.env.NAME_LENGTH
}

export { VAR_LENGTH };