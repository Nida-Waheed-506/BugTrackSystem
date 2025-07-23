const express = require("express");
const bugRouter = express.Router();
const { userAuth } = require("../middleware/userAuth");
const { isQA } = require("../middleware/isQA");
const { createBugFun } = require("../apps/bugs/bugManager");
const { getAllBugsOfProjectFunc } = require("../apps/bugs/bugManager");
const multer = require("multer");
const { isQAandDev } = require("../middleware/isQAandDev");
const { statusChangeFunc } = require("../apps/bugs/bugManager");


//configure multer to store files in memory ( RAM ) as buffer

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



//bug created by the QA only

bugRouter.post('/project/:project_id/bug', userAuth, isQA, upload.single('screenshot'), createBugFun);


//get the bugs of the project with detail 

bugRouter.get('/project/:project_id/bugs', userAuth, getAllBugsOfProjectFunc);

//Developer & QA update the status

bugRouter.patch("/project/:project_id/bugs/:bug_id/status", userAuth, isQAandDev, statusChangeFunc);

module.exports = { bugRouter };