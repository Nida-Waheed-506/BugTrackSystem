const sequelize = require("sequelize");
const db = new sequelize(
  "postgres", //database name
  "postgres", //username
  "your_new_password", //password
  {
    host: "localhost",
    port: 5432,
    dialect: "postgres", //which database use sql , postgres
  }
);

module.exports = { db };
