import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Profile.css";
import { useAuth } from "../../authContext";
import Navbar from "../../Navbaar";
import RepoComponent from "./RepoComponent";
import { use } from "react";
import HeatMap from "./HeatMap";

const Profile = () => {
  const [repos, setRepos] = useState([]);
  const [user, setUser] = useState("");
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://githubclonebackend.onrender.com/userProfile/${userId}`,
          {}
        );
        setUser(response.data.username);
        // setRepos(response.data.repositories);
        // console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchrefo = async () => {
      try {
        const response = await fetch(
          `https://githubclonebackend.onrender.com/repo/user/${userId}`
        );
        const data = await response.json();
        // setRepositorie(data.repository);
        // console.log(data.repository);
        setRepos(data.repository);
        // console.log(data.repository);
        // console.log(repos);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUser();
    fetchrefo();
  }, []);
  useEffect(() => {
    console.log("this is repo for only cheaking porpuse", repos);
  }, [repos]);
  return (
    <>
      <Navbar />
      <div className="mt-16 mx-4 flex flex-col lg:flex-row lg:justify-between">
        <div className="profile-section w-full lg:w-[35%] p-4">
          <div className="profile-image flex justify-center">
            <img
              className="rounded-full w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 object-cover mx-auto"
              src="https://images.unsplash.com/photo-1484863137850-59afcfe05386?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDg4MDd8MHwxfHNlYXJjaHwxMXx8dXNlcnxlbnwwfHx8fDE3NDAxMzc2MjZ8MA&ixlib=rb-4.0.3&q=80&w=1080"
              alt="profile"
            />
          </div>
          <h1 className="text-center text-xl font-bold mt-4">{user}</h1>
          <button className="block mx-auto mt-4 px-6 py-2 bg-blue-600 text-white rounded-md">
            Follow
          </button>
          <div className="flex justify-center gap-4 mt-4">
            <p>Followers 34 .</p>
            <p>Following 12</p>
          </div>
        </div>
        <div className="repo-section grid grid-cols-1 md:gap-x-2 sm:grid-cols-2 lg:grid-cols-2 gap-2 p-4 w-full lg:w-[60%]">
          {repos?.length > 0 ? (
            repos.map((repo) => <RepoComponent key={repo.name} repo={repo} />)
          ) : (
            <p className="text-gray-400">Loading repositories...</p>
          )}
        </div>
      </div>
      <div className="heat flex flex-row-reverse lg:mr-28 sm:mr-[12%] p-4 md:mr-20">
      <HeatMap/>
      </div>
    </>
  );
};

export default Profile;
