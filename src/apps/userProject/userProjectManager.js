const {projectAssign , getAllAssignedUsers} = require("./userProjectController");

const assignedProjectFun = async(req,res,next)=>{
       try {
        const { managerId: manager_id  , projectId : project_id} = req.params;
        const {assigned_UserId } = req.body;
        const projectAssigned = await projectAssign(manager_id , project_id , assigned_UserId);
        if (projectAssigned) res.json({ message: "User assigned to  project  successfully", data: projectAssigned });

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


const getAllAssignedUsersToProjFun=async(req,res,next)=>{

    
  const { id: project_id } = req.params; 
 

      try {
        const allAssignedUsers = await getAllAssignedUsers(project_id);
        if (allAssignedUsers) res.json({ message: "All users assigned to project", data: allAssignedUsers });

    } catch (error) {
        res.status(404).json({ message: error.message });
    }


  
}

module.exports = {assignedProjectFun , getAllAssignedUsersToProjFun};