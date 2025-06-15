import sequelize from "../config/dbConnection.js";
import { DataTypes } from "sequelize";

export const User = sequelize.define("Users",{
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
});
