const { createBugInDB } = require("../../handlers/bugHandlers");
const { statusValidator } = require("../../utils/statusValidation");
const { getAllBugsOfProjectFromDB} = require("../../handlers/bugHandlers");
const { statusChangeOnDB } = require("../../handlers/bugHandlers");
const { retrieveUserFromDB} = require("../../handlers/user_projectHandlers");
const {sendEmail} = require("../../utils/sendEmail");

const createBug = async (project_id, QA_id, screenshot, bugDetails) => {
  const { type, status } = bugDetails;

  statusValidator(type, status);

  const bug = await createBugInDB(project_id, QA_id, screenshot, bugDetails);

  if(bug){

    const user = await retrieveUserFromDB(bug.developer_id);
   
    sendEmail(user , bug ,"bug");

  }

  return bug;
};

const getAllBugsOfProject = async (project_id) => {
  return await getAllBugsOfProjectFromDB(project_id);
};

const statusChange = async ( project_id , id, status ,user_id) => {
  console.log(id, status);

  return await statusChangeOnDB( project_id , id, status,user_id);
};
module.exports = { createBug, getAllBugsOfProject, statusChange };
