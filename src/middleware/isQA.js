const isQA= async(req, res, next)=>{

    const {user_type} = req.user;
  
    if(user_type !== "QA") throw new Error("Only QA handle the bug");
    next(); 
}

module.exports = {isQA};