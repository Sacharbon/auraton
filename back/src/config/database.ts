import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import {initUserModel} from "@models/user";
import {initAnnounceModel} from "@models/announce";
import {initCommentModel} from "@models/comment";

dotenv.config();

const HOST = process.env.DATABASE_HOST || "";
const USER = process.env.DATABASE_USER || "";
const PASSWORD = process.env.DATABASE_PASSWORD || "";
const DATABASE = process.env.DATABASE_DB || "";

const database = new Sequelize(DATABASE, USER, PASSWORD, {
    host: HOST,
    dialect: 'mysql'
});

export async function initializeDatabase()
{
    // Login to the database
    try {
        await database.authenticate();
        await initUserModel(database);
        await initAnnounceModel(database);
        await initCommentModel(database);
        console.log('Successfully connected to the db.');
    } catch (error) {
        console.error('An error occurred while connecting to the database: ', error);
    }

    try {
        console.log("Successfully initialized models.");
    } catch (error) {
        console.error('An error occurred while initializing models: ', error);
    }

    // Sync tables
    try {
        await database.sync({ force: true }) // Use 'force: true' to fully reset the database, or 'alter: true' to keep data
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('An error occurred while synchronizing the database: ', error);
    }

}
