const { get } = require("http");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { MongoClient, ReturnDocument } = require("mongodb");
const dotenv = require("dotenv");
var objectId = require("mongodb").ObjectId;

dotenv.config();

const mongoURI = process.env.MONGODB_URI;

let client;

async function connectToMongo() {
  client = new MongoClient(mongoURI, { });
  await client.connect();
}

const getAllusers = async (req, res) => {
  try {
    await connectToMongo();
    const db = client.db("apnaGitClone");
    const userCollection = db.collection("users");

    const users = await userCollection.find({}).toArray();
    res.json(users);
  } catch (error) {
    console.error("Error during get all users", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    await connectToMongo();
    const db = client.db("apnaGitClone");
    const userCollection = db.collection("users");

    const user = await userCollection.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      username,
      email,
      password: hashedPassword,
      repository: [],
      followedUser: [],
      starRepos: [],
    };

    const result = await userCollection.insertOne(newUser);
    const token = jwt.sign(
      { id: result.insertedId },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );
    console.log("User signed up successfully");
    res.json({ token, userId: result.insertedId });
  } catch (error) {
    console.error("Error during signup", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    await connectToMongo();
    const db = client.db("apnaGitClone");
    const userCollection = db.collection("users");

    const user = await userCollection.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    res.json({ token, userId: user._id });
  } catch (error) {
    console.error("Error during login", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getUserProfile = async (req, res) => {
  const userId = req.params.id;
  await connectToMongo();
  const db = client.db("apnaGitClone");
  const userCollection = db.collection("users");

  const user = await userCollection.findOne({ _id: new objectId(userId) });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  res.json(user);

  try {
  } catch (error) {
    console.log("Error during get user profile", error.message);
    res.ststus(500).json({ message: "Server error" });
  }
};

const updateUserProfile = async (req, res) => {
  const currentId = req.params.id;
  const { email, password } = req.body;

  try {
    let updateFeilds = { email };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      updateFeilds.password = hashPassword;
    }

    await connectToMongo();
    const db = client.db("apnaGitClone");
    const userCollection = db.collection("users");

    const result = await userCollection.findOneAndUpdate(
      { _id: new objectId(currentId) },
      { $set: updateFeilds },
      { returnDocument: "after" }
    );

    if(!result.value){
        return res.status(500).json({message : "User not Found"})
    }

    res.send(result);
  } catch (error) {
    console.log("Error during update user profile", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteUserProfile = async (req, res) => {
  const userId = req.params.id;
  try {
    await connectToMongo();
    const db = client.db("apnaGitClone");
    const userCollection = db.collection("users");

    const result = await userCollection.deleteOne({ _id: new objectId(userId) });

    if (result.deletedCount === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.log("Error during delete user profile", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllusers,
  signUp,
  logIn,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
