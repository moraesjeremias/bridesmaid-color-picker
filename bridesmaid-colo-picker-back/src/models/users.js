import sequelize from "../config/dbConnection.js";
import { DataTypes } from "sequelize";

export const User = sequelize.define("Users",{
    id:{
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    hasPickedColor:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
});
