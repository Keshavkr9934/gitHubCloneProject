import React ,{useEffect, useState} from "react";
import { Link } from "react-router-dom";
import "./navbaar.css";
import Logo from "./assets/github-mark-white.svg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./authContext";
const Navbar = () => {
  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userMenu, setUserMenu]=useState(false);
  const [repository, setRepositorie]=useState([]);
  const [username, setUserName]=useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleMenuClose= ()=>{
    setIsMenuOpen(!isMenuOpen);
  }
  const toggleUser = ()=>{
    setUserMenu(!userMenu);
  }
  const toggleUserClose = ()=>{
    setUserMenu(!userMenu);
  }

  useEffect(()=>{
    const userId = localStorage.getItem("userId");
    const fetchUsername= async ()=>{
      try {
        const response = await fetch(`http://localhost:3000/userProfile/${userId}`);
        const data = await response.json();
        setUserName(data.username);
      } catch (error) {
        console.error("Error during get userName", error.message);
        res.status(500).json({ message: "Server error" });
      }
    }

    const fetchRepository= async ()=>{
      try {
        const response = await fetch(
          `http://localhost:3000/repo/user/${userId}`
        );
        const data=await response.json();
        setRepositorie(data.repository);

      } catch (error) {
        console.error("Error during get all repository", error.message);
        res.status(500).json({ message: "Server error" });
      }
    }
    
    fetchUsername();
    fetchRepository();
  }, []);
  const routs=async()=>{
    navigate("/");
  }
  return (
   <>
   <div className="navbar">
    <div className="left-section">
      <div className="hameburger"  onClick={toggleMenu}><i class="fa-solid fa-bars ham "></i></div>
      <img onClick={routs} src={Logo} style={{marginTop: "1rem"}} alt="Logo" />
      <h1 onClick={routs} style={{cursor: "pointer"}}>Dashboard</h1>

    </div>
    <div className="right-section">
         <a href="https://chatgpt.com/" target="_blank" rel="noopener noreferrer" data-tooltip="ChatBot"><i class="fa-brands fa-discord"></i></a>
         <a href="/createRepo" data-tooltip= "Create new.."><i class="fa-solid fa-plus"></i></a>
         <a href="/CreateIssue" data-tooltip="Issue" ><i class="fas fa-exclamation-circle"></i>
        </a>
         <a href="" data-tooltip="Pull-Requests"><i class="fas fa-code-branch"></i></a>
         <a href="" data-tooltip="Notification"><i class="fa-solid fa-envelope"></i></a>
          <a href="" data-tooltip="UserIfo" onClick= {(e)=>{e.preventDefault();
          toggleUser();
          }}><i class="fa-regular fa-circle-user  "></i> </a>
    </div>
   </div>
    {/* Sidebar */}
    <div className={`sidebar ${isMenuOpen ? "open" : ""}`}>
        <ul>
          <li>
          <i class="fa-solid fa-xmark x" onClick={toggleMenuClose}></i>
            <a href="#issues"><i class="fa-solid fa-house"></i>Home</a>
          </li>
          <li>
            <a href="#pull-requests"><i class="fas fa-exclamation-circle"></i>
            Issues</a>
          </li>
          <li>
            <a href="#projects"><i class="fas fa-code-branch"></i>Pull Requests</a>
          </li>
          <li>
            <a href="#settings"><i class="fa-solid fa-diagram-project"></i>Projects</a>
          </li>
          <li>
            <a href=""><i class="fa-regular fa-comments"></i>Discussion</a>
          </li>
          <li>
            <a href=""><i class="fa-solid fa-screwdriver-wrench"></i>Settings</a>
          </li>
          <hr />
          <p className="repo">Repositories</p>
           {repository?.map((repo)=>{
            return(
              <div className="repo_name" key={repo._id}>
                <li>{repo.name}</li>
              </div>
            )
           })}
        </ul>
      </div>

      {/* Overlay for Sidebar */}
      {/* {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}><i class="fa-solid fa-bars ham "></i></div>} */}
      {isMenuOpen && <div className="sidebar">Sidebar Content</div>}
      {/* this is user sidebar */}
      <div className={`userId ${userMenu ? "open" : "" }`}>
          <ul>
            <li>
            <i class="fa-solid fa-xmark y" onClick={toggleUserClose}></i>
              <a href=""><i class="fa-regular fa-circle-user  "></i>&nbsp; {username}</a>
            </li>
            <hr className="set" />
            <li>
              <a href="/profile">Your Profile</a>
            </li>
            <li>
              <a href="">Your Repository</a>
            </li>
            <li>
              <a href="">Your Projects</a>
            </li>
            <li>
              <a href="">Your Stars</a>
            </li>
            <li>
              <a href="">Your Organization</a>
            </li>
            <li>
              <a href="">Your Enterprise</a>
            </li>
            <li className="logout">
              <a href="" onClick={()=>{
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                setCurrentUser(null);
                navigate("/auth");

              }}>LogOut</a>
            </li>
          </ul>
      </div>
   </>
  );
};

export default Navbar;
