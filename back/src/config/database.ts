import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import User, {initUserModel} from "@models/user";
import Event, {initEventModel} from "@models/event";
import Comment, {initCommentModel} from "@models/comment";
import Registration, {initRegistrationModel} from "@models/registration";

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

    Registration.belongsTo(Event, {
        foreignKey: "eventId",
        targetKey: "id",
        as: "registeredUsers"
    });

    Event.hasMany(Registration, {
        foreignKey: "eventId",
        sourceKey: "id",
        as: "registeredUsers"
    });

    User.belongsTo(Registration, {
        foreignKey: "id",
        targetKey: "userId",
        as: "user"
    });

    Registration.hasOne(User, {
        foreignKey: "id",
        sourceKey: "userId",
        as: "user"
    });
}

function generateRandomFaceId()
{
    const floatArray = new Float32Array(128);

    for (let i = 0; i < floatArray.length; i++) {
        floatArray[i] = Math.random();
    }
    return [Object.values(floatArray)];
}

async function createUsers()
{
     await User.create({
         firstName: "Manech",
         lastName: "Dubreil",
         faceDescriptor: generateRandomFaceId(),
         roles: ['Roi'],
         pictureUrl: "uploads/users/1_picture.jpeg",
         aura: 214_821_000
     });
     await User.create({
         firstName: "Pablo",
         lastName: "Jesus",
         faceDescriptor: generateRandomFaceId(),
         roles: ['Seigneur'],
         pictureUrl: "uploads/users/2_picture.jpeg",
         aura: 204_124_000
     });
     await User.create({
         firstName: "Timéo",
         lastName: "Trégarot",
         faceDescriptor: generateRandomFaceId(),
         roles: ['Seigneur'],
         pictureUrl: "uploads/users/3_picture.jpeg",
         aura: 101_211_000
     });
     await User.create({
         firstName: "Elie",
         lastName: "Stroun",
         faceDescriptor: generateRandomFaceId(),
         roles: ['Seigneur'],
         pictureUrl: "uploads/users/4_picture.jpeg",
         aura: 101_125_000
     });
     await User.create({
         firstName: "Manish",
         lastName: "Le Sherpa",
         faceDescriptor: generateRandomFaceId(),
         roles: ['Seigneur'],
         pictureUrl: "uploads/users/5_picture.jpeg",
         aura: 99_000_001
     });
     await User.create({
         firstName: "Augustin",
         lastName: "BOST",
         faceDescriptor: generateRandomFaceId(),
         roles: ['Seigneur'],
         pictureUrl: "uploads/users/6_picture.jpeg",
         aura: 80_000_000
     });
     await User.create({
         firstName: "Marmotte",
         lastName: "",
         faceDescriptor: generateRandomFaceId(),
         roles: ['Seigneur'],
         pictureUrl: "uploads/users/7_picture.jpeg",
         aura: 70_000_000
     });
}

async function createEvent()
{
    await Event.create({
        label: "SPORT",
        title: "Tek1 VS Tek2",
        description: "Hello à tous, l'évènement des tek1 vs tek2 se déroulera le 21 janvier 2025 à 18h.",
        imageUrl: "uploads/events/1.jpg",
        authorId: 6,
        likes: 12,
        scheduledAt: "2025-01-21 18:00:00"
    });
    await Event.create({
        label: "BDE",
        title: "Vente de crêpe !",
        description: "Oye oye, vente des crêpes mardi prochain de 15h à 17h !",
        imageUrl: "uploads/events/2.jpg",
        authorId: 7,
        likes: 21,
        scheduledAt: "2025-01-20 15:00:00"
    });
    await Event.create({
        label: "LOISIR",
        title: "Raclette de noël",
        description: "Oye oye, la raclette de noël sera le 19 décembre à partir de 20h",
        imageUrl: "uploads/events/3.webp",
        authorId: 7,
        likes: 42,
        scheduledAt: "2024-12-19 20:00:00"
    });
    await Event.create({
        label: "SPORT",
        title: "Entraînement de foot",
        description: "Salut ! On va faire un tournoi de foot vendredi prochain à 16h, n'hésitez pas à venir !",
        imageUrl: "uploads/events/4.jpg",
        authorId: 6,
        likes: 11,
        scheduledAt: "2025-01-24 16:00:00"
    });
    await Event.create({
        label: "LOISIR",
        title: "Laser Game",
        description: "Oye oye ! On va faire un laser game ce mardi à 17h. Envoyez moi un MP si vous participez !",
        imageUrl: "uploads/events/5.jpg",
        authorId: 7,
        likes: 16,
        scheduledAt: "2024-12-10 17:00:00"
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
        await initRegistrationModel(database);
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

        await createUsers();
        await createEvent();
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('An error occurred while synchronizing the database: ', error);
    }

}
