import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import User from "./user.js";

const Color = sequelize.define("Colors", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  displayName: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false, defaultValue: "AVAIABLE" },
  avaiable: { type: DataTypes.BOOLEAN, defaultValue: true, allowNull: false },
  userId: { type: DataTypes.INTEGER, references: { model: "Users", key: "id" }, allowNull: true },
  createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
});

Color.belongsTo(User, { foreignKey: "userId" });

export default Color;
