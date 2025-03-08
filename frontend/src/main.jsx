import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.jsx";
import { AuthProvider } from "./authContext.jsx";
import ProjectRouter from "./Router.jsx";
import { BrowserRouter, BrowserRouter as Router } from "react-router-dom";
import SignUp from "./components/auth/SignUp.jsx";
import Navbar from "./Navbaar.jsx";
import NewRepo from "./components/repo/NewRepo.jsx";

createRoot(document.getElementById("root")).render(
    <AuthProvider>
      <Router>
        <Navbar />
        <ProjectRouter />
      </Router>
    </AuthProvider>
);
