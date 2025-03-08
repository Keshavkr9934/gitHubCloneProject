const express = require("express");
const userRouter = require("./user.router");
const repoRouter=require("./repo.router");
const issueRouter=require("./issue.router");

const mainRouter = express.Router();

mainRouter.use( userRouter);    // This is the main router that will
mainRouter.use( repoRouter);    // be used in the server.js file
mainRouter.use( issueRouter);    // to route the requests to the

mainRouter.get("/", (req, res) => {
    res.send("welcome to the server");
  });


module.exports = mainRouter;