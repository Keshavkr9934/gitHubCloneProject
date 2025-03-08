import React, { useEffect, useState } from "react";
import axios from "axios";
import Logo from "../../assets/github-mark-white.svg";
import { Link } from "react-router-dom";
import { useAuth } from "../../authContext";
import "./auth.css";

const Login = () => {
  // useEffect(() => {
  //   localStorage.removeItem("userId");
  //   localStorage.removeItem("token");
  //   setCurrentUser(null);
  // }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);
  const { currentUser, setCurrentUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/login", {
        email: email,
        password: password,
      });
       setEmail("");
        setPassword("");
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("token", res.data.token);

      setCurrentUser(res.data.userId);
      setLoading(false);

      window.location.href = "/";
    } catch (err) {
      console.log(err);
      alert("Login Failed");
      setEmail("");
      setPassword("");
      setLoading(false);
    }
  };

  return (
    <div className="signinwrapper lg:mt-20 md:mt-20 sm:mt-16 mt-20">
      <div className="logo-in-logo-container">
        <img className="logo-login" src={Logo} alt="Logo" />
      </div>
      <h1>Login</h1>
      <div className="login-box-wrapper">
        <div className="login-heading">
          <label htmlFor="email">Email</label>
          <input
            className="box"
            type="text"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            className="box"
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="button" type="submit" onClick={handleLogin} disabled={Loading}>
            
            {Loading ? "Loading..." : "Login"}
          </button>
        </div>
      </div>
      <div className="accoutn">
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
