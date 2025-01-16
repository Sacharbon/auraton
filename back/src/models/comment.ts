import {DataTypes, Model, Sequelize} from 'sequelize';
import User from "@models/user";
import Event from "@models/event";

class Comment extends Model {
    declare authorId: number;
    declare eventId: number;
    declare comment: string;
    declare likes: number;
}

export async function initCommentModel(database: Sequelize) {
    Comment.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            authorId: {
                type: DataTypes.INTEGER,
                references: {
                    model: User,
                    key: 'id'
                }
            },
            eventId: {
                type: DataTypes.INTEGER,
                references: {
                    model: Event,
                    key: 'id'
                }
            },
            comment: {
                type: DataTypes.STRING,
                allowNull: false
            },
            likes: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
        },
        {
            sequelize: database, modelName: 'Comment'
        }
    );

}

export default Comment;