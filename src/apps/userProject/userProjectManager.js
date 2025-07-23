const { projectAssign, getAllAssignedDev } = require("./userProjectController");

const assignedProjectFun = async (req, res, next) => {
  try {
    const { id: manager_id } = req.user;
    const { project_id } = req.params;
    const { assigned_UserId } = req.body;
    const projectAssigned = await projectAssign(
      manager_id.toString(),
      project_id.toString(),
      assigned_UserId
    );
    if (projectAssigned)
      res.json({
        message: "User assigned to  project  successfully",
        data: projectAssigned,
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllAssignedDevToProjFun = async (req, res, next) => {
  const { project_id } = req.params;

  try {
    const allAssignedUsers = await getAllAssignedDev(project_id.toString());
    if (allAssignedUsers)
      res.status(200).json({
        message: "All developers assigned to project",
        data: allAssignedUsers,
      });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = { assignedProjectFun, getAllAssignedDevToProjFun };
