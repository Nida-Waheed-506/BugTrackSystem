const sequelize = require("sequelize");
const { db } = require("../config/db");

const Project = db.define(
  "Project",
  {
    projectName: {
      type: sequelize.DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    projectDes: {
      type: sequelize.DataTypes.STRING,
    },
    manager_id: {
      type: sequelize.DataTypes.STRING,
    },
    taskDone: {
      type: sequelize.DataTypes.INTEGER,
    },
    image: {
      type: sequelize.DataTypes.BLOB("long"),
    },
  },
  {
    tablename: "Projects",
  }
);

module.exports = { Project };
