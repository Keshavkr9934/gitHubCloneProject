import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import "./repo.css";
import axios from "axios";
// import Issue from "../../../../backend/models/issueModel";

const NewRepo = () => {
  const [owner, setOwner] = useState("");
  const [repoName, setRepoName] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState([]);
  const [visibility, setVisibility] = useState(false);
  const [repoUrl, setRepoUrl] = useState("");
  const [repoId, setRepoId] = useState("");
  const [userId, setUserId] = useState("");
  const [repoList, setRepoList] = useState([]);
  const [error, setError] = useState("");
  // const visible = visibility ? "public" : "private";
  const navigate=useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setUserId(userId);
    const fetchUsername = async () => {
      try {
        const response = await fetch(`https://githubclonebackend.onrender.com/userProfile/${userId}`);
        const data = await response.json();
        setOwner(data.username);
      } catch (error) {
        console.error("Error during get userName", error.message);
        res.status(500).json({ message: "Server error" });
      }
    };
    fetchUsername();

  },[]);
  const fetchRepository = async () => {
    
    try {
      const resposne = await axios.post(`https://githubclonebackend.onrender.com/create/Repo`,{
        name: repoName,
        description: description,
        content: content,
        visibility: visibility,
        owner: userId,
        Issue: [],
      });
      setRepoUrl(resposne.data.repoUrl);
      setRepoId(resposne.data.repoId);
      // <Link to={"/"}></Link>
      navigate("/");
    } catch (error) {
      console.error("Error during get all repository", error.message);
      res.status(500).json({ message: "Server error" });
    }
  };

  return (
    <div className="repos">
      <h1 className="h3s">Create a new repository</h1>
      <p>
        A repository contains all project files, including the revision history.
        Already have a project repository elsewhere?
      </p>

      <hr style={{ marginBottom: "1rem" }} className="hra" />
      <p style={{ marginBottom: "1.7rem" }}>
        Required fields are marked with an asterisk (*).
      </p>
      <div className="inputs">
        <label id="leb1" htmlFor="owner">
          Owner
        </label>
        <input
        style={{color: "black" , fontWeight : "bold" , padding: "0.3rem"}}
          type="text"
          id="owner"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
        />
        <label id="leb2" htmlFor="repositoryName">
          Repository name
        </label>
        <input
        style={{color: "black" , padding: "0.3rem"}}
          className="input2"
          type="text"
          id="repositoryName"
          value={repoName}
          onChange={(e) => setRepoName(e.target.value)}
        />
      </div>
      <p style={{ margin: "1.3rem 0 1.3rem 0" }}>
        Great repository names are short and memorable. Need inspiration? How
        about
      </p>
      <label id="leb3" htmlFor="description">
        Description(Optional)
      </label>
      <input
      style={{color: "black" , padding: "0.3rem"}}
        type="text"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <hr className="hra" style={{ marginBottom: "0.7rem" }} />
      <label id="leb4">
        <input type="radio" name="visibility" value="public" required  onClick={() => setVisibility(true)}  />
        &nbsp; <i class="fas fa-globe"></i> Public
      </label>
      <label>
        <input type="radio" name="visibility" value="private"  onClick={() => setVisibility(false)} />
        &nbsp; <i class="fas fa-lock"></i> Private
      </label>
      <br />
      <button className="btn"onClick={fetchRepository}>Create_Repository</button>
    </div>
  );
};

export default NewRepo;
