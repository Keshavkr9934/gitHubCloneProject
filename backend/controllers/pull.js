const fs=require("fs").promises;
const path=require("path");
const axios=require("axios");
const { b2 }=require("../config/blakbazeB2-config");
const { error } = require("console");

async function pullRepo(){
   const repoPath=path.resolve(process.cwd(), ".apnaGit");
   const commitsPath=path.join(repoPath, "commits");

   try {
    await b2.authorize();
    console.log("b2 Autherisation is successfull");

    const bucketName = "my-GitHubProject-bucket";
    let bucketId;
    
    try {
        const bucketInfo = await b2.getBucket({ bucketName });
        // console.log("bucketinfo is :",bucketInfo);
        if (bucketInfo.data.buckets && bucketInfo.data.buckets.length > 0){
            bucketId=bucketInfo.data.buckets[0].bucketId;
        }else{
            throw new Error("Bucket not Found")
        }
    } catch (error) {
        throw new Error("Faild to retrive bucket", error.message);
        return;
    }

    if(!bucketId){
        throw new Error("Failed to Reterive BUcketId");
    }

    console.log("BucketId :", bucketId);

    // List all files in the bucket
    const fileListResponse = await b2.listFileNames({ bucketId });
    const files = fileListResponse.data.files;

    if (files.length === 0) {
      console.log("No files found in the bucket.");
      return;
    }

    for(const file of files){
        const fileName=file.fileName;
        const commitDir = path.join(commitsPath, path.dirname(fileName).split("/").pop());


        await fs.mkdir(commitDir, {recursive:true});

        const downloadUrl = `${b2.downloadUrl}/file/${bucketName}/${fileName}`;
        // console.log(`Downloading file from ${downloadUrl}`);
      

        try {
            const response=await axios.get(downloadUrl,{
                headers:{Authorization:b2.authorizationToken},
                responseType:"arraybuffer"
            });

            const filePath = path.join(commitsPath, fileName);
            // console.log(" this is file path :", filePath);
            await fs.writeFile(filePath, response.data);
            // console.log(`File ${fileName} downloaded successfully to ${filePath}`);
            console.log("you have succefully downloaded file in your local system")

        } catch (error) {
           console.log("Failed to DownloadFile", error)
        }
    }

   } catch (error) {
    console.log("Unable to Pull", error);
   }
}

module.exports={pullRepo};