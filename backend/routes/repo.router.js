const express=require('express');

const repoRouter=express.Router();

const repoController=require('../controllers/repoControllers');


repoRouter.post('/create/Repo',repoController.createRepository);
repoRouter.get('/repo/all',repoController.getAllRepository);
repoRouter.get('/repo/:id',repoController.fetchRepositoryById);
repoRouter.get('/repo/name/:name',repoController.fetchRepositoryByName); 
repoRouter.get('/repo/user/:userID',repoController.fetchRepositoryForCurrentUser);
repoRouter.put('/repo/update/:id',repoController.updateRepository);
repoRouter.delete('/repo/delete/:id',repoController.deleteRepository);
repoRouter.patch('/repo/toggel/:id',repoController.visibilityTogel);

// createRepository,
//      getAllRepository, 
//      fetchRepositoryById, 
//      fetchRepositoryByName,
//       fetchRepositoryForCurrentUser, 
//       updateRepository, 
//       visibilityTogel, 
//       deleteRepository
module.exports=repoRouter;
