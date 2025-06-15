import sequelize from "../config/dbConnection";
import { DataTypes } from "sequelize";

export const Color = sequelize.define("Colors",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    displayName:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    status:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "AVAIABLE"
    },
    avaiable:{
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
    },
    userId:{
        type: DataTypes.INTEGER,
        references:{
            model: "Users",
            key: 'id'
        }
    },
});

 