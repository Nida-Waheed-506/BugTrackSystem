const { Project } = require("../models/project");


const addProjectToDB = async (projectData, image, loggedInUserData) => {
  const { projectName, projectDes, taskDone } = projectData;

  const { id } = loggedInUserData;

  return await Project.create({
    projectName: projectName,
    projectDes: projectDes,
    manager_id: id,
    taskDone: taskDone,
    image: image,
  });
};

const projectsGetFromDB = async () => {
  const projects = await Project.findAll({
    attributes: [
      "id",
      "projectName",
      "projectDes",
      "taskDone",
      "manager_id",
      "image",
    ],
  });

  return projects.map((project) => {
    const projectJSON = project.toJSON();

    if (projectJSON.image) {
      projectJSON.image = projectJSON.image.toString("base64");
    }

    return projectJSON;
  });
};

const updateProjectOnDB = async (projectId, manager_id, projectData) => {
  const project = await Project.findOne({
    where: { id: projectId, manager_id: manager_id },
  });

  if (!project) throw new Error("You not create this project");

  const { projectName, projectDes, taskDone } = projectData;

  const updatedProject = await project.update({
    projectName: projectName,
    projectDes: projectDes,
    taskDone,
  });

  return await updatedProject.save();
};

const deleteProjectOnDB = async (projectId, manager_id) => {
  const project = await Project.findOne({
    where: { id: projectId, manager_id: manager_id },
  });
  if (!project) throw new Error("You not create this project");

  return await project.destroy();
};

module.exports = {
  addProjectToDB,
  projectsGetFromDB,
  updateProjectOnDB,
  deleteProjectOnDB,
};
