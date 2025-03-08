const mongoose = require("mongoose");
const Repository = require("../models/repoModel");
const User = require("../models/userModel");
const Issue = require("../models/issueModel");

const createRepository = async (req, res) => {
  const { owner, name, issue, content, description, visibility } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ message: "Repository name is required" });
    }
    if (!mongoose.Types.ObjectId.isValid(owner)) {
      return res.status(400).json({ message: "Owner is required" });
    }

    const newRepository = new Repository({
      owner,
      name,
      issue,
      content,
      description,
      visibility,
    });

    const result = await newRepository.save();
    res
      .status(201)
      .json({
        message: "Repository created successfully",
        repositoryId: result._id,
      });
  } catch (error) {
    console.error("Error during create repository", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllRepository = async (req, res) => {
  try {
    const repositories = await Repository.find({})
      .populate("owner")
      .populate("issue");
    res.json(repositories);
  } catch (error) {
    console.error("Error during get all repository", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const fetchRepositoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const repository = await Repository.find({ _id: id })
      .populate("owner")
      .populate("issue");
    res.send(repository);
  } catch (error) {
    console.error("Error during get repository by id", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const fetchRepositoryByName = async (req, res) => {
  const { name } = req.params;
  try {
    const repository = await Repository.find({ name: repoName });
    if (!repository || repository.length === 0) {
      return res.status(400).json({ message: "Repository not found" });
    }
    res.json({ message: "Repository found", repository });
  } catch (error) {
    console.error("Error during get repository by name", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const fetchRepositoryForCurrentUser = async (req, res) => {
  const { userID}  = req.params;
  // console.log(req.params);
  try {
    const repository = await Repository.find({ owner: userID });
    // console.log(repository);
    // console.log(userID);  
    if (!repository || repository.length === 0) {
      return res.status(400).json({ message: "Repository not found" });
    }
    res.json({ message: "Repository found", repository });
  } catch (error) {
    console.error("Error during get repository by user", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const updateRepository = async (req, res) => {
  const { id } = req.params;
  const { content, description } = req.body;
  try {
    const repository = await Repository.findById({ id });
    if (!repository) {
      return res.status(400).json({ message: "Repository not found" });
    }
    repository.content.push(content);
    repository.description = description;
    const updatedRepository = await repository.save();
    res.json({ message: "Repository updated successfully", updatedRepository });
  } catch (error) {
    console.error("Error during update repository", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
const visibilityTogel = async (req, res) => {
  const { id } = req.params;
  try {
    const repository = await Repository.findById({ id });
    if (!repository) {
      return res.status(400).json({ message: "Repository not found" });
    }
    repository.visibility = !repository.visibility;
    const updatedRepository = await repository.save();
    res.json({ message: "Visibility togel successfully", updatedRepository });
  } catch (error) {
    console.error("Error during togel visibility", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteRepository = async (req, res) => {
    const { id } = req.params;
    try {
        const repository = await Repository.findByIdAndDelete({ id });
        if (!repository) {
        return res.status(400).json({ message: "Repository not found" });
        }
        res.json({ message: "Repository deleted successfully" });
    } catch (error) {
        console.error("Error during delete repository", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
  createRepository,
  getAllRepository,
  fetchRepositoryById,
  fetchRepositoryByName,
  fetchRepositoryForCurrentUser,
  updateRepository,
  visibilityTogel,
  deleteRepository,
};
