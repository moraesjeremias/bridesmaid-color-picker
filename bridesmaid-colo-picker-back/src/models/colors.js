import { version } from "react";
import sequelize from "../config/dbConnection.js";
import { DataTypes } from "sequelize";

export const Color = sequelize.define("Colors", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    displayName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('AVAILABLE', 'RESERVED', 'CONFIRMED'),
        allowNull: false,
        defaultValue: "AVAILABLE",
        validate: {
            isIn: [['AVAILABLE', 'RESERVED', 'CONFIRMED']]
        }
    },
    avaiable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: "Users",
            key: 'id'
        },
        allowNull: true,
        validate: {
            async isValidUserReservation(value) {
                if (value && this.status !== 'AVAILABLE') {
                    const existingReservation = await Color.findOne({
                        where: {
                            userId: value,
                            status: ['RESERVED', 'CONFIRMED'],
                            id: { [Op.ne]: this.id }
                        }
                    });

                    if (existingReservation) {
                        throw new Error('Usuário já possui uma cor reservada');
                    }
                }
            }
        }
    },
    reservedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    version: {
        //sa porra aqui é em último caso kkkkkkkkkk
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    }
});

