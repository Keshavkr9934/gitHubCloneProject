import React, { useEffect } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/auth/Login";
import Profile from "./components/user/Profile";
import SignUp from "./components/auth/SignUp";
import CreateIssue from "./components/issue/CreateIssue";

//authcontex
import { useAuth } from "./authContext";
import { use } from "react";
import NewRepo from "./components/repo/NewRepo";

const ProjectRouter = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("userId");
    if (token || !currentUser) {
      setCurrentUser(token);
    }

    if (!token && !["/auth", "/signup"].includes(window.location.pathname)) {
      navigate("/auth");
    }
    if (token && window.location.pathname === "/auth") {
      navigate("/");
    }
  }, [currentUser, setCurrentUser, navigate]);

  let routes = useRoutes([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/auth",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
        path: "/profile",
        element: <Profile />,
    },
    {
      path: "/createRepo",
      element :<NewRepo/>
    },
    {
      path: "/CreateIssue",
      element: <CreateIssue />,
    }
  ]);
  return(
  <div className="cls" style={{width: "100%" , height:"100%" }}>
  {routes}
  </div>
  )
   
};

export default ProjectRouter;   
