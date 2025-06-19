import sequelize from "../config/dbConnection.js";
import { DataTypes } from "sequelize";

export const User = sequelize.define("Users",{
    id:{
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    colorPicked: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    hasPickedColor:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
});
