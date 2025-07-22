const { createBugInDB } = require("../../handlers/bugHandlers");
const { statusValidator } = require("../../utils/statusValidation");
const { getAllBugsOfProjectFromDB } = require("../../handlers/bugHandlers");
const { statusChangeOnDB } = require("../../handlers/bugHandlers");


const createBug = async (project_id, QA_id, screenshot, bugDetails) => {

    const { type, status } = bugDetails;

    statusValidator(type, status);

    return await createBugInDB(project_id, QA_id, screenshot, bugDetails);
}


const getAllBugsOfProject = async (project_id) => {

    return await getAllBugsOfProjectFromDB(project_id);
}


const statusChange = async (id, status) => {

    console.log(id, status)

    return await statusChangeOnDB(id, status);
}
module.exports = { createBug, getAllBugsOfProject, statusChange }