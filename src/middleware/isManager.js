const isManager = async(req, res, next)=>{

    const {user_type} = req.user;
  
    if(user_type !== "manager") throw new Error("Only manager handle the project");
    next(); 
}

module.exports = {isManager};