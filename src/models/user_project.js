const sequelize = require("sequelize");
const { db } = require("../config/db");
const User_Project = db.define("User_Project", {
    manager_id: {
        type: sequelize.DataTypes.STRING,
    },
    project_id: {
        type: sequelize.DataTypes.STRING,
    },
    assigned_UserId: {
        type: sequelize.DataTypes.STRING,
    }

}, {
    tablename: "User_Project"
})

module.exports = { User_Project };