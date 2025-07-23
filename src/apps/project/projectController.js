const { addProjectToDB } = require("../../handlers/projectHandlers");
const { projectsGetFromDB } = require("../../handlers/projectHandlers");
const { updateProjectOnDB } = require("../../handlers/projectHandlers");
const { deleteProjectOnDB } = require("../../handlers/projectHandlers");


const addProject = async (projectData, image, loggedInUserData) => {
  //add project to DB
  return await addProjectToDB(projectData, image, loggedInUserData);
};

const getProjects = async () => {
  //get project from DB
  return await projectsGetFromDB();
};

const updateProject = async (projectId, manager_id, projectData) => {
  return await updateProjectOnDB(projectId, manager_id, projectData);
};

const deleteProject = async (projectId, manager_id) => {
  return await deleteProjectOnDB(projectId, manager_id);
};

module.exports = { addProject, getProjects, updateProject, deleteProject };
