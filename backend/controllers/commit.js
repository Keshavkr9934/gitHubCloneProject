const fs=require("fs").promises;
const path=require("path");
const { json } = require("stream/consumers");
const {v4: uuidv4}=require("uuid");

async function commitRepo(message){
    const repoPath=path.resolve(process.cwd(),".apnaGit");
    const stagedPath=path.join(repoPath, "staging");
    const commitPath=path.join(repoPath, "commits");

    try {
        const commitID=uuidv4();
        const commitDir=path.join(commitPath , commitID);
        await fs.mkdir(commitDir , {recursive:true});


        const files=await fs.readdir(stagedPath);

        for( const file of files){
            await fs.copyFile(
            path.join(stagedPath , file), 
            path.join(commitDir, file));
        }

        const istTimestamp = new Date().toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hourCycle: "h24", // Optional: Use h12 for 12-hour format
        });
        await fs.writeFile(path.join(commitDir , "commit.json"), JSON.stringify({message, date : istTimestamp}));
        console.log(`Commit ${commitID} created with message : ${message}`)
    } catch (error) {
        console.error("Error detect in commited file" , error);
    }
}

module.exports ={commitRepo};