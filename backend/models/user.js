import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const User = sequelize.define("Users", {
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  userId: { type: DataTypes.STRING, allowNull: false, unique: true }, // sha256
});

export default User;
