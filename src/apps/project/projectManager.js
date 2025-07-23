const { addProject } = require("./projectController");
const { getProjects } = require("./projectController");
const { updateProject } = require("./projectController");
const { deleteProject } = require("./projectController");

const addProjectFunc = async (req, res, next) => {
  try {
    // added the project
    const project = await addProject(req.body, req?.file?.buffer, req.user);

    if (project)
      res
        .status(201)
        .json({ message: "Project added successfully", data: project });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        error: "Project with same name already exists.",
      });
    }

    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({ error: "Unexpected error" });
  }
};

const getProjectsFunc = async (req, res, next) => {
  try {
    // get the project
    const projects = await getProjects(req.body, req.user);
    if (projects)
      res.status(200).json({ message: "Projects Detail", data: projects });
  } catch (error) {
    res.status(404).json({ error: "Projects No Found" });
  }
};

const updateProjectFunc = async (req, res, next) => {
  try {
    const { project_id: projectId } = req.params;
    const { id: manager_id } = req.user;
    const project = await updateProject(
      projectId,
      manager_id.toString(),
      req.body
    );

    if (project)
      res
        .status(200)
        .json({ message: "Project updated successfully", data: project });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteProjectFunc = async (req, res, next) => {
  try {
    const { project_id: projectId } = req.params;

    const { id: manager_id } = req.user;
    const project = await deleteProject(projectId, manager_id.toString());
    if (project)
      res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  addProjectFunc,
  getProjectsFunc,
  updateProjectFunc,
  deleteProjectFunc,
};
