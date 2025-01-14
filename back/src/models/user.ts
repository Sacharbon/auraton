import {DataTypes, Model, Sequelize} from 'sequelize';
import {VAR_LENGTH} from "@config/variables";

class User extends Model {
    declare id: number;
    declare firstName: string;
    declare lastName: string;
    declare faceDescriptor: number[]; // Float32
    declare role: string[];
}

export async function initUserModel(database: Sequelize) {
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            firstName: {
                type: DataTypes.STRING(VAR_LENGTH.NAME),
                allowNull: false,
            },
            lastName: {
                type: DataTypes.STRING(VAR_LENGTH.NAME),
                allowNull: false,
            },
            faceDescriptor: {
                type: DataTypes.JSON,
                allowNull: false,
                defaultValue: []
            },
            role: {
                type: DataTypes.JSON,
                allowNull: false,
                defaultValue: []
            }
        },
        {
            sequelize: database, modelName: 'User'
        }
    );
}

export default User;