const sequelize = require("sequelize");
const { db } = require("../config/db");
const { User } = require("./user");
const User_Project = db.define(
  "User_Project",
  {
    manager_id: {
      type: sequelize.DataTypes.STRING,
    },
    project_id: {
      type: sequelize.DataTypes.STRING,
    },
    assigned_UserId: {
      type: sequelize.DataTypes.INTEGER,
    },
  },
  {
    tablename: "User_Project",
  }
);

User_Project.belongsTo(User, { foreignKey: "assigned_UserId" });

module.exports = { User_Project };
