const express = require("express");
const user_projectRouter = express.Router();
const {
  assignedProjectFun,
} = require("../apps/userProject/userProjectManager");
const { userAuth } = require("../middleware/userAuth");
const { isManager } = require("../middleware/isManager");
const {
  getAllAssignedDevToProjFun,
} = require("../apps/userProject/userProjectManager");

// user_projectRouter.post('/assignProject/:managerId/:projectId' , userAuth, isManager, assignedProjectFun);
user_projectRouter.post(
  "/projects/:project_id/assign",
  userAuth,
  isManager,
  assignedProjectFun
);

user_projectRouter.get(
  "/porjects/:project_id/developers",
  userAuth,
  getAllAssignedDevToProjFun
);

module.exports = { user_projectRouter };

// Hello username

// You have been assigned to the project: project name

// Thank you.
