import {DataTypes, Model, Sequelize} from 'sequelize';
import User from "@models/user";
import Comment from "@models/comment";
import Registration from "@models/registration";

class Event extends Model {
    declare id: number;
    declare label: string;
    declare title: string;
    declare description: string;
    declare imageUrl?: string;
    declare authorId: number;
    declare likes: number;
    declare scheduledAt: string;

    declare author: User;
    declare comments: Comment[];
    declare registeredUsers: Registration[];
}

export async function initEventModel(database: Sequelize) {
    Event.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            label: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ""
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false
            },
            imageUrl: {
                type: DataTypes.STRING,
                allowNull: true
            },
            authorId: {
                type: DataTypes.INTEGER,
                references: {
                    model: User,
                    key: 'id'
                }
            },
            likes: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            scheduledAt: {
                type: DataTypes.DATE,
                allowNull: false
            }
        },
        {
            sequelize: database, modelName: 'Event'
        }
    );

}

export default Event;