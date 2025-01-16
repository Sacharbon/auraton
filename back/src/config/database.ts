import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import User, {initUserModel} from "@models/user";
import Event, {initEventModel} from "@models/event";
import Comment, {initCommentModel} from "@models/comment";

dotenv.config();

const HOST = process.env.DATABASE_HOST || "";
const USER = process.env.DATABASE_USER || "";
const PASSWORD = process.env.DATABASE_PASSWORD || "";
const DATABASE = process.env.DATABASE_DB || "";

const database = new Sequelize(DATABASE, USER, PASSWORD, {
    host: HOST,
    dialect: 'mysql'
});

async function initConstraints()
{
    Comment.belongsTo(Event, {
        foreignKey: "eventId",
        targetKey: "id",
        as: "comments"
    });

    Event.hasMany(Comment, {
        foreignKey: "eventId",
        sourceKey: "id",
        as: "comments"
    });

    Event.hasOne(User, {
        foreignKey: "id",
        sourceKey: "authorId",
        as: "author"
    });

    User.belongsTo(Event, {
        foreignKey: "id",
        targetKey: "authorId",
        as: "author"
    });
}

export async function initializeDatabase()
{
    // Login to the database
    try {
        await database.authenticate();
        await initUserModel(database);
        await initEventModel(database);
        await initCommentModel(database);
        await initConstraints();
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
