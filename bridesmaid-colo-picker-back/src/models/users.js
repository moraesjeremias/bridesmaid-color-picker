import sequelize from "../config/dbConnection";
import { DataTypes } from "sequelize";

export const User = sequelize.define("Users",{
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
});
