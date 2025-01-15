import {DataTypes, Model, Sequelize} from 'sequelize';
import User from "@models/user";
import Comment from "@models/comment";

class Announce extends Model {
    declare id: number;
    declare label: string;
    declare title: string;
    declare description: string;
    declare imageUrl?: string;
    declare videoUrl?: string;
    declare authorId: number;
    declare likes: number;

    declare author: User;
    declare comments: Comment[];
}

export async function initAnnounceModel(database: Sequelize) {
    Announce.init(
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
            videoUrl: {
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
            }
        },
        {
            sequelize: database, modelName: 'Announce'
        }
    );
}

export default Announce;