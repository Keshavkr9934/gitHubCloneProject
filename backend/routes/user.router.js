const express=require('express');

const userRouter=express.Router();

const userController=require('../controllers/userControler');

userRouter.get('/allUsers',userController.getAllusers); 
userRouter.post('/signup',userController.signUp);
userRouter.post('/login',userController.logIn);
userRouter.get('/userProfile/:id',userController.getUserProfile);
userRouter.put('/updateProfile/:id',userController.updateUserProfile);
userRouter.delete('/deleteProfile/:id',userController.deleteUserProfile);

module.exports=userRouter;
