const { User_Project } = require("../models/user_project");
const { Bugs } = require("../models/bugs");
const { statusValidator } = require("../utils/statusValidation");



const createBugInDB = async (project_id, QA_id, screenshot, bugDetails) => {

    const { title, description, deadline, type, status, developer_id } = bugDetails;

    console.log(deadline);

    //QA is assigned to that project or not by manager

    const isValidQAToProject = await User_Project.findOne({ where: { assigned_UserId: QA_id } });
    if (!isValidQAToProject) throw new Error("You ( with profession QA ) are not assigned to that project");

    // That QA assign project to which developer which is already assigned to that project by manager 

    const isValidDevToProject = await User_Project.findOne({ where: { assigned_UserId: developer_id } });
    if (!isValidDevToProject) throw new Error("You ( with profession Devloper )  are not assigned to that project");


    //Create the bug

    return await Bugs.create({ title: title, description: description, deadline: deadline, screenshot: screenshot, type: type, status: status, project_id: project_id, QA_id: QA_id, developer_id: developer_id });



}


const getAllBugsOfProjectFromDB = async (project_id) => {

  


  const bugs = await Bugs.findAll({ where:{project_id : project_id},
    attributes: ['title', 'description', 'deadline', 'screenshot', 'type', 'status' , 'project_id' , 'QA_id' , 'developer_id']
  });

  return bugs.map(bug => {
    const bugJSON = bug.toJSON();

    if (bugJSON?.screenshot) {
      bugJSON.screenshot = bugJSON.screenshot.toString('base64');
    }

    return bugJSON;
  });
}



const statusChangeOnDB = async (id, status) => {



    const obj = await Bugs.findOne({ where: { id: id } });
    if (!obj) throw new Error("This bug or feature not exist");
    statusValidator(obj.type, status);
    return await obj.update({ status: status });

}

module.exports = { createBugInDB, getAllBugsOfProjectFromDB, statusChangeOnDB }



