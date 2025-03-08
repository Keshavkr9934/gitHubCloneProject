const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
const mainRouter = require("./routes/main.router");

dotenv.config();
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const { initRepo } = require("./controllers/init");
const { addRepo } = require("./controllers/add");
const { commitRepo } = require("./controllers/commit");
const { pullRepo } = require("./controllers/pull");
const { revertRepo } = require("./controllers/revert");
const { pushRepo } = require("./controllers/push");

yargs(hideBin(process.argv))
  .command("start", "Starts a new server", {}, startServer)
  .command("init", "Initialise new repository", {}, initRepo)
  .command(
    "add <file>",
    "Add a file to the repository",
    (yargs) => {
      yargs.positional("file", {
        describe: "File to add to the staging area",
        type: "string",
      });
    },
    (argv) => {
      addRepo(argv.file);
    }
  )
  .command(
    "commit <message>",
    "commit the staged file",
    (yargs) => {
      yargs.positional("message", {
        describe: "commit message",
        type: "string",
      });
    },
    (argv) => {
      commitRepo(argv.message);
    }
  )
  .command("pull", "pull commits from s3", {}, pullRepo)
  .command("push", "push commits from s3", {}, pushRepo)
  .command(
    "revert <commitID>",
    "Revert to specific commit",
    (yargs) => {
      yargs.positional("commitID", {
        describe: "Commit Id to revert to",
        type: "string",
      });
    },
    (argv) => {
      revertRepo(argv.commitID);
    }
  )
  .demandCommand(1, "you need at least one command")
  .help().argv;

async function startServer() {
  const app = express();
  const port = process.env.PORT || 3000;
  app.use(bodyParser.json());
  app.use(express.json());

  const mongoURI = process.env.MONGODB_URI;

  async function main() {
    try {
      await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // Timeout for server selection
        heartbeatFrequencyMS: 10000,
      });
      console.log("Connected to MongoDB");
    } catch (err) {
      console.error("Unable to connect", err.message);
    }
  }
  main();
  let user = "test";
  app.use(cors({ origin: "*" }));
  app.use("/", mainRouter);

  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected");
    socket.on("disconnect", (userID) => {
      user = userID;
      console.log("Client disconnected");
      socket.join(userID);
    });
  });

  const db = mongoose.connection;
  db.once("open", async () => {
    console.log("Connected to MongoDB");

    //crud operations
  });

  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  }); // Start the server on port 3000
}
