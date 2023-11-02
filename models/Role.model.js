import { db } from "../database/dataSource.js";
import { DataTypes } from "sequelize";
import { user } from "./User.model.js";
export const Role = db.define("Role", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  role_name: {
    type: DataTypes.STRING,
    values: ["student", "teacher"],
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

