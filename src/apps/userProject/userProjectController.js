const { projectAssignDB, getAllAssignedUsersFromDB , retrieveUserFromDB} = require("../../handlers/user_projectHandlers");
const { sendEmail } = require("../../utils/sendEmail");
const projectAssign = async (manager_id, project_id, assigned_UserId) => {

    const projectAssign = await projectAssignDB(manager_id, project_id, assigned_UserId);
    if (projectAssign) { 

       const user = await  retrieveUserFromDB(projectAssign.assigned_UserId);
       if(user) sendEmail(user);
    }

    return projectAssign;



}

const getAllAssignedUsers = async (project_id) => {


    return await getAllAssignedUsersFromDB(project_id);

}
module.exports = { projectAssign, getAllAssignedUsers };