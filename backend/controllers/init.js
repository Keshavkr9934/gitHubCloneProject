const fs=require("fs").promises;
const path=require("path");

async function initRepo(){
    const repoPath=path.resolve(process.cwd(),".apnaGit");
    const commitPath=path.join(repoPath, "commits")

    try {
        await fs.mkdir(repoPath , {recursive:true});
        await fs.mkdir(commitPath , {recursive:true});
        await fs.writeFile(path.join(repoPath ,"config.json"), JSON.stringify({bucket: process.env.S3_BUCKET}));
        console.log("Repository Initialised !");
    } catch (error) {
        console.error("Error Initialising Repository", error);
    }
}


module.exports={initRepo};