const {
  projectAssign,
  getAllAssignedDev,
} = require("./userProjectController"); 

const assignedProjectFun = async (req, res, next) => {
  try {
    const { id: manager_id } = req.user;
    const { project_id } = req.params;
    const { assigned_UserId } = req.body;
    const projectAssigned = await projectAssign(
      manager_id,
      project_id,
      assigned_UserId
    );
    if (projectAssigned)
      res.json({
        message: "User assigned to  project  successfully",
        data: projectAssigned,
      });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getAllAssignedDevToProjFun = async (req, res, next) => {
  const { project_id } = req.params;

  try {
    const allAssignedUsers = await getAllAssignedDev(project_id);
    if (allAssignedUsers)
      res.json({
        message: "All users assigned to project",
        data: allAssignedUsers,
      });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { assignedProjectFun, getAllAssignedDevToProjFun };
