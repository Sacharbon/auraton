import {DataTypes, Model, Sequelize} from 'sequelize';
import {VAR_LENGTH} from "@config/variables";

class User extends Model {
    declare id: number;
    declare firstName: string;
    declare lastName: string;
    declare faceDescriptor: number[]; // Float32
    declare roles: string[];
    declare pictureUrl: string;
    declare aura: number;
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
            roles: {
                type: DataTypes.JSON,
                allowNull: false,
                defaultValue: []
            },
            pictureUrl: {
                type: DataTypes.STRING,
                allowNull: true
            },
            aura: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 0
            }
        },
        {
            sequelize: database, modelName: 'User'
        }
    );
}

export default User;