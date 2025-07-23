const {
  projectAssignDB,
  getAllAssignedDevFromDB,
  retrieveUserFromDB,
  retrieveProjectFromDB
} = require("../../handlers/user_projectHandlers");
const { sendEmail } = require("../../utils/sendEmail");
const projectAssign = async (manager_id, project_id, assigned_UserId) => {
  const projectAssign = await projectAssignDB(
    manager_id,
    project_id,
    assigned_UserId
  );
  if (projectAssign) {
    const user = await retrieveUserFromDB(projectAssign.assigned_UserId);
    const project = await retrieveProjectFromDB(projectAssign.project_id);
    sendEmail(user , project , "project");
  }

  return projectAssign;
};

const getAllAssignedDev = async (project_id) => {
  return await getAllAssignedDevFromDB(project_id);
};
module.exports = { projectAssign, getAllAssignedDev };
