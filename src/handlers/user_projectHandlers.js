const { Project } = require("../models/project");
const { User_Project } = require("../models/user_project");
const { User } = require("../models/user");
const { Op } = require("sequelize");

const projectAssignDB = async (manager_id, project_id, assigned_UserId) => {
  const userISQADev = await User.findOne({
    where: {
      id: assigned_UserId,
      user_type: { [Op.or]: ["Developer", "QA"] },
    },
  });
  if (!userISQADev)
    throw new Error("You can only assign project to Developer and QA");
  const managerOwnProject = await Project.findOne({
    where: { id: project_id, manager_id: manager_id },
  });

  if (!managerOwnProject) throw new Error("Manager does'nt own that project");

  // no double assignment of project
  const alreadyAssign = await User_Project.findOne({
    where: { project_id: project_id, assigned_UserId: assigned_UserId },
  });
  if (alreadyAssign) throw new Error("User already assign to that project");

  const user_project = await User_Project.create({
    manager_id: manager_id,
    project_id: project_id,
    assigned_UserId: assigned_UserId,
  });
  return user_project;
};

const retrieveUserFromDB = async (user_Id) => {
  return await User.findOne({ where: { id: user_Id } });
};

const getAllAssignedDevFromDB = async (project_id) => {
  return await User_Project.findAll({
    where: { project_id },
    include: [
      {
        model: User,
        where: { user_type: "developer" },
        attributes: ["id", "name", "email"],
      },
    ],
  });
};

module.exports = {
  projectAssignDB,
  getAllAssignedDevFromDB,
  retrieveUserFromDB,
};
