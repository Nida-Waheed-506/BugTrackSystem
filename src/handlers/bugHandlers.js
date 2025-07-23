const { User_Project } = require("../models/user_project");
const { Bugs } = require("../models/bugs");
const { statusValidator } = require("../utils/statusValidation");
const { Op } = require("sequelize");

const createBugInDB = async (project_id, QA_id, screenshot, bugDetails) => {
  const { title, description, deadline, type, status, developer_id } =
    bugDetails;

  console.log(deadline);

  //QA is assigned to that project or not by manager

  const isValidQAToProject = await User_Project.findOne({
    where: { assigned_UserId: parseInt(QA_id), project_id: project_id },
  });
  if (!isValidQAToProject)
    throw new Error(
      "You (with profession QA ) are not assigned to that project"
    );

  // That QA assign project to which developer which is already assigned to that project by manager

  console.log(project_id, developer_id);
  const isValidDevToProject = await User_Project.findOne({
    where: { assigned_UserId: parseInt(developer_id), project_id: project_id },
  });
  if (!isValidDevToProject)
    throw new Error("To which developer you assign , it not exists ");

  //Create the bug

  return await Bugs.create({
    title: title,
    description: description,
    deadline: deadline,
    screenshot: screenshot,
    type: type,
    status: status,
    project_id: project_id,
    QA_id: QA_id,
    developer_id: developer_id,
  });
};

const getAllBugsOfProjectFromDB = async (project_id) => {
  const bugs = await Bugs.findAll({
    where: { project_id: project_id },
    attributes: [
      "title",
      "description",
      "deadline",
      "screenshot",
      "type",
      "status",
      "project_id",
      "QA_id",
      "developer_id",
    ],
  });

  return bugs.map((bug) => {
    const bugJSON = bug.toJSON();

    if (bugJSON?.screenshot) {
      bugJSON.screenshot = bugJSON.screenshot.toString("base64");
    }

    return bugJSON;
  });
};

const statusChangeOnDB = async (project_id, id, status, user_id) => {
  const obj = await Bugs.findOne({ where: { id: id } });
  if (!obj) throw new Error("This bug or feature not exist");
  statusValidator(obj.type, status);

  const isValidUser = await Bugs.findOne({
    where: {
      project_id: project_id,
      [Op.or]: [{ developer_id: user_id }, { QA_id: user_id }],
    },
  });

  if (!isValidUser)
    throw new Error("You are not assigned to the bug of that project");

  return await obj.update({ status: status });
};




module.exports = { createBugInDB, getAllBugsOfProjectFromDB, statusChangeOnDB};
