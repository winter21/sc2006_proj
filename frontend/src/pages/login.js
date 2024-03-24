import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SwoleMates from "../assets/SwoleMates.png";
import ShowPW from "../assets/ShowPW.png";
import HidePW from "../assets/HidePW.png";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility

  const navigate = useNavigate();

  const navigateToSignUp = () => {
    navigate("/signup");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the state for password visibility
  };

  const onButtonClick = () => {
    //    /*    enabled for testing purposes only
    props.setLoggedIn(true)
    props.setEmail(email)
    navigate("/")
    //    */

    // You'll update this function later...
    // Set initial error values to empty
    setEmailError("");
    setPasswordError("");

    // Check if the user has entered both fields correctly
    if ("" === email) {
      setEmailError("Please enter your email");
      return;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    if ("" === password) {
      setPasswordError("Please enter a password");
      return;
    }

    if (password.length < 7) {
      setPasswordError("The password must be 8 characters or longer");
      return;
    }

    // Authentication calls will be made here...
  };

  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        {/* Insert the <img> element here */}
        <img
          src={SwoleMates}
          alt="SwoleMates Logo"
          style={{ width: "400px", height: "auto" }}
        />
        <div>Log In</div>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          type={showPassword ? "text" : "password"} // Toggle input type based on showPassword state
          className={"inputBox"}
        />
        <img
          src={showPassword ? HidePW : ShowPW} // Show or hide password icon based on showPassword state
          alt={showPassword ? "Hide Password" : "Show Password"}
          onClick={togglePasswordVisibility} // Toggle password visibility when clicked
          className="passwordLI"
          style={{ cursor: "pointer" }}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onButtonClick}
          value={"Log In"}
        />
      </div>
      {/* Additional button to navigate to signup page */}
      <div>
        Don't have an account?
        <button className="redUnderlineButton" onClick={navigateToSignUp}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;
