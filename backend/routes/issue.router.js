const express=require('express');

const issueRouter=express.Router();

const issueController=require('../controllers/issueControllers');

issueRouter.post('/create/issue',issueController.createIssue);  
issueRouter.get('/issue/all',issueController.getAllIssues);
issueRouter.get('/issue/:id',issueController.getIssueByID);
issueRouter.put('/issue/update/:id',issueController.updateIssueByID);
issueRouter.delete('/issue/delete/:id',issueController.deleteIssueByID);

module.exports=issueRouter;
