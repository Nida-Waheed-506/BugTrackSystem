const express = require("express");
const userRouter = express.Router();
const { addUser, getUser } = require("../apps/user/userManager");
const { userAuth } = require("../middleware/userAuth");
const { isManager } = require("../middleware/isManager");
const { getAllUsersFunc } = require("../apps/user/userManager");
userRouter.post("/signup", addUser);

userRouter.get("/login", getUser);

userRouter.post("/logout", async (req, res) => {
  // expire the cookies
  res.cookie("token", null, { expires: new Date(Date.now()) });

  res.status(200).json({ message: "Logout successfully" });
});

userRouter.get("/users", userAuth, isManager, getAllUsersFunc);

module.exports = { userRouter };
