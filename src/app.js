const express = require('express');
const app = express();

// db import 
const {db} = require('./config/db');

// routes import
const {userRouter} = require('./routes/user');


app.use(express.json());

app.use('/' , userRouter);








const startServer = async () => {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");

    await db.sync({ force: false, alter: false, logging: false });
    console.log("All models were synchronized successfully.");

    app.listen(8000, () => {
      console.log(`Server is running on port `);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer(); 



