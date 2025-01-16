import {DataTypes, Model, Sequelize} from 'sequelize';
import User from "@models/user";
import Event from "@models/event";

class Registration extends Model {
    declare userId: number;
    declare eventId: number;

    declare user: User;
}

export async function initRegistrationModel(database: Sequelize) {
    Registration.init(
        {
            userId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                references: {
                    model: User,
                    key: 'id'
                }
            },
            eventId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                references: {
                    model: Event,
                    key: 'id'
                }
            },
        },
        {
            sequelize: database, modelName: 'Registration'
        }
    );
}

export default Registration;
