import React, { useEffect, useState } from "react";
import "./Profile.css";

const RepoComponent = ({ repo }) => {
  const [visible, setVisible] = useState("");
  useEffect(() => {
    if (repo.visibility === true) {
      setVisible("public");
    } else {
      setVisible("private");
    }
  }, [visible]);
  return (
    <div className="w-full sm:w-[48%] md:w-full lg:w-[90%] card cards p-4 h-[9rem] rounded-lg border-2 
    border-gray-700 shadow-lg bg-gray-800 text-white hover:scale-105 transition-transform duration-300">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg">{repo.name}</h3>
        <h3 className="text-sm px-3 py-1 bg-blue-600 rounded">{visible}</h3>
      </div>
      <p className="text-gray-300 mt-2">HTML</p>
    </div>
  );
};
export default RepoComponent;
