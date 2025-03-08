const fs = require("fs").promises;
const path = require("path");
const axios = require("axios"); // Ensure axios is installed
const { b2 } = require("../config/blakbazeB2-config");

async function pushRepo() {
  const repoPath = path.resolve(process.cwd(), ".apnaGit");
  const commitPath = path.join(repoPath, "commits");

  try {
    // Authorize B2
    await b2.authorize();

    // Ensure the bucket exists
    const bucketName = "my-GitHubProject-bucket";
    let bucketId;
    try {
      const bucketInfo = await b2.getBucket({ bucketName });
      if (bucketInfo.data.buckets && bucketInfo.data.buckets.length > 0) {
        bucketId = bucketInfo.data.buckets[0].bucketId;
      } else {
        throw new Error("BucketNotFound");
      }
    } catch (err) {
      if (err.response?.status === 404) {
        const bucketInfo = await b2.createBucket({
          bucketName,
          bucketType: "private",
        });
        bucketId = bucketInfo.data.bucketId;
      } else {
        throw err;
      }
    }

    if (!bucketId) {
      throw new Error("Failed to retrieve or create bucket ID.");
    }

    console.log("Bucket ID:", bucketId);

    // Fetch upload URL and token once
    const uploadUrlResponse = await b2.getUploadUrl({ bucketId });
    const uploadUrl = uploadUrlResponse.data.uploadUrl;
    const authorizationToken = uploadUrlResponse.data.authorizationToken;

    if (!uploadUrl || !authorizationToken) {
      throw new Error("Failed to retrieve upload URL or authorization token.");
    }

    console.log("Upload URL:", uploadUrl);
    console.log("Upload Authorization Token:", authorizationToken);

    // Process commits and upload files
    const commitDirs = await fs.readdir(commitPath);

    for (const commitDir of commitDirs) {
      const commitsPath = path.join(commitPath, commitDir);
      const files = await fs.readdir(commitsPath);

      for (const file of files) {
        const filePath = path.join(commitsPath, file);
        const fileContent = await fs.readFile(filePath);

        // Upload file using axios
        const headers = {
          Authorization: authorizationToken,
          "Content-Type": "b2/x-auto",
          "Content-Length": fileContent.length,
          "X-Bz-File-Name": `${commitDir}/${file}`,
          "X-Bz-Content-Sha1": "do_not_verify",
        };

        try {
          const uploadResponse = await axios.post(uploadUrl, fileContent, { headers });
          console.log(`Uploaded ${file} successfully:`);
        } catch (uploadError) {
          console.error(`Failed to upload ${file}:`, uploadError);
        }
      }
    }
  } catch (error) {
    console.error("Error pushing to B2 Bucket:", error);
  }
}

module.exports = { pushRepo };
