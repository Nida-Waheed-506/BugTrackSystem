const isQAandDev = async(req, res, next)=>{

    const {user_type} = req.user;
  
    if(user_type !== "developer" && user_type !== "QA") throw new Error("Only QA and Developer handle the status of bug or feature");
    next(); 
}

module.exports = {isQAandDev};