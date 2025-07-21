const express = require('express');
const userRouter = express.Router();
const {addUser , getUser} = require('../apps/user/userManager');

userRouter.post('/signup', addUser);

userRouter.get('/login' , getUser);

userRouter.delete('/logout' , async(req,res)=>{

    // expire the cookies

    res.json({message : 'User logged out successfully'});

})

module.exports = {userRouter}



