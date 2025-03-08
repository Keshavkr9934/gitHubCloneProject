import React, { useState, useEffect } from "react";
import axios from "axios";
import Logo from "../../assets/github-mark-white.svg";
import "./auth.css";
import { useAuth } from "../../authContext";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);

  const { setCurrentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/signup", {
        username: username,
        email: email,
        password: password,
      });

      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("token", res.data.token);

      setCurrentUser(res.data.userId);
      setLoading(false);

      window.location.href = "/";

    } catch (err) {
      console.log(err);
      alert("Invalid Credentials");
      setUsername("");
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
      <h1>Sign&nbsp;Up</h1>
      <div className="login-box-wrapper">
        <div className="login-heading">
          <label htmlFor="username">Username</label>
          <input
            className="box"
            type="text"
            id="username"
            name="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="email">Email</label>
          <input
            className="box"
            type="email"
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
          {/* <label htmlFor="button">Button</label> */}
          <button className="button" type="submit" onClick={handleSubmit} disabled={Loading}>  
            {Loading ? "Loading..." : "Sign Up"}
          </button>
        </div>
      </div>
      <div className="accoutn">
        <p>
          Already have an account? <Link to="/auth">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
