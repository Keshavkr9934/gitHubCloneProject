const mongoose = require("mongoose"); // import mongoose
const Issue = require("../models/issueModel"); // import issue model
const Repository = require("../models/repoModel"); // import repo model
const User = require("../models/userModel"); // import user model

const createIssue = async (req, res) => {
  const { title, description } = req.body; // get title, description, status, repoId from request body
  const { id } = req.params;
  try {
    const issue = new Issue({
      title,
      description,
      repository: id,
    });
    await issue.save();
    res.status(201).json(issue);
  } catch (err) {
    console.error("Error during delete repository", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllIssues = async (req, res) => {
  const { id } = req.params;
  try {
    const issues = await Issue.find({ repository: id });
    if(!issues){
        return res.status(404).json({error : "Issues not found"});
    }
    res.status(200).json(issues);
  } catch (error) {
    console.error("Error during get all issues", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const updateIssueByID = async (req, res) => {
  const {id}=req.params;
  const {title, description, status}=req.body;

  try {
    const issue=await Issue.findById({id});
    if(!issue){
        return res.status(404).json({error : "Issue not found"});
    }
    issue.title=title;
    issue.description=description;
    issue.status=status;
    await issue.save();
    res.json(issue);

  } catch (error) {
    console.error("Error during update issue", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteIssueByID = async (req, res) => {
    const {id}=req.params;
    try {
        const issue=await Issue.findByIdAndDelete({id});
        if(!issue){
            return res.status(404).json({error : "Issue not found"});
        }
        res.json({message : "Issue deleted successfully"});
    } catch (error) {
        console.error("Error during delete issue", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

const getIssueByID = async (req, res) => {
  const {id}=req.params;
  try {
    const issue=await Issue.findById({id});
    if(!issue){
        return res.status(404).json({error : "Issue not found"});
    }
    res.json(issue);

    }
    catch (error) {
        console.error("Error during get issue by id", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
  createIssue,
  getAllIssues,
  updateIssueByID,
  deleteIssueByID,
  getIssueByID,
}; // export all functions
