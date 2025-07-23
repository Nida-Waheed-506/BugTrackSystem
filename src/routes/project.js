const express = require("express");
const projectRouter = express.Router();
const { userAuth } = require("../middleware/userAuth");
const { isManager } = require("../middleware/isManager");
const { addProjectFunc } = require("../apps/project/projectManager");
const { getProjectsFunc } = require("../apps/project/projectManager");
const { updateProjectFunc } = require("../apps/project/projectManager");
const { deleteProjectFunc } = require("../apps/project/projectManager");

const multer = require("multer");

//configure multer to store files in memory as buffer

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//create the project
projectRouter.post(
  "/projects",
  userAuth,
  isManager,
  upload.single("image"),
  addProjectFunc
);

// get the project
projectRouter.get("/projects", userAuth, getProjectsFunc);

// update the project
projectRouter.patch(
  "/projects/:project_id",
  userAuth,
  isManager,
  updateProjectFunc
);

// delete the project

projectRouter.delete(
  "/projects/:project_id",
  userAuth,
  isManager,
  deleteProjectFunc
);

module.exports = { projectRouter };
