import React, { useEffect, useState } from "react";
import { use } from "react";
import "./dashboard.css";
import Navbar from "../../Navbaar";
// import HeatMapProfile from "../user/HeatMap";

const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);


  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const fetchRepositories = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/repo/user/${userId}`
        );
        const data = await response.json();
        // console.log(data);
        // setRepositories(data.repository);
        if(data.repository.length === 0){
          setRepositories([]);  
        } 
        else{
          setRepositories(data.repository);
        }

        // console.log(userId);
      } catch (error) {
        console.error("Error during get all repository", error.message);
        res.status(500).json({ message: "Server error" });
      }
    };
    const fetchSuggestedRepositories = async () => {
      try {
        const response = await fetch(`http://localhost:3000/repo/all`);
        const data = await response.json();
        // setSuggestedRepositories(data);
        if(data.length === 0){
          setSuggestedRepositories([]);
        }else{
          setSuggestedRepositories(data);
        }
        // console.log(suggestedRepositories);
        // console.log(data);
      } catch (error) {
        console.error("Error during get all repository", error.message);
        res.status(500).json({ message: "Server error" });
      }
    };
    fetchSuggestedRepositories();
    fetchRepositories();
  }, []);

  useEffect(() => {
    if (searchQuery == "") {
      setSearchResults(repositories);
      // return;
    } else {
      const filteredRepo = repositories.filter((repo) => {
        return repo.name.toLowerCase().includes(searchQuery.toLowerCase());
        //  repo.name.toLowerCase().includes(searchQuery.toLowerCase());
      });
      // console.log( "this is query",searchQuery);
      // console.log("this is repository",repositories);

      // console.log( "this is result",filteredRepo);
      setSearchResults(filteredRepo);
    }
  }, [repositories, searchQuery]);
  return (
    <>
      {/* <Navbar/> */}
      <section className="dashboard flex flex-col lg:m-20 md:mt-[12rem] mt-[6rem] md:flex-row justify-center items-start lg:mt-[15rem] gap-10 md:gap-16 lg:gap-48 px-4">
        
        {/* Suggested Repositories */}
        <aside className="w-full md:w-1/3 p-2 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-1">Suggested Repository</h3>
          {suggestedRepositories.map((repo) => (
            <div key={repo._id} className="mb-2 p-1 rounded-md shadow-sm">
              <h4 className="font-semibold">{repo.name}</h4>
              <p className="text-sm text-gray-600">{repo.description}</p>
            </div>
          ))}
        </aside>

        {/* Main Content - Repositories */}
        <main className="w-full md:w-1/3 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-1">Repositories</h3>
          <div className="search mb-2 ">
            <input
            style={{color: "black"}}
              type="text"
              placeholder="🔍 Search.../repo"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-1 border rounded-md"
            />
          </div>
          {searchResults.map((repo) => (
            <div key={repo._id} className="mb-2 p-1 rounded-md shadow-sm">
              <h4 className="font-semibold">{repo.name}</h4>
              <p className="text-sm text-gray-600">{repo.description}</p>
            </div>
          ))}
        </main>

        {/* Upcoming Events */}
        <aside className="w-full md:w-1/3 p-2 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-2">Upcoming Events</h3>
          <ul className="list-disc pl-5">
            <li className="mb-2"><p>Tech Conference - Dec-15</p></li>
            <li className="mb-2"><p>Developer Meetup - Dec-15</p></li>
            <li className="mb-2"><p>Tech Conference - Dec-15</p></li>
          </ul>
        </aside>

      </section>
      
    </>
  );
};

export default Dashboard;
