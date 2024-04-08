import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SwoleMates from "../assets/SwoleMates.png";
import BackgroundImage from "../assets/RedBg.jpg";
import ShowPW from "../assets/ShowPW.png";
import HidePW from "../assets/HidePW.png";
import axios from "axios";

const Signup = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to track confirm password visibility

  const navigate = useNavigate();

  const navigateToLogIn = () => {
    navigate("/login");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the state for password visibility
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword); // Toggle the state for confirm password visibility
  };

  const onButtonClick = () => {
    // Set initial error values to empty
    setUsernameError("");
    setPasswordError("");
    setConfirmPasswordError("");

    // Check if the user has entered both fields correctly
    if ("" === username) {
      setUsernameError("Please enter your username");
      return;
    }

    if (username.length > 50) {
      setUsernameError("Username must be less than 50 characters");
      return;
    }

    if ("" === password) {
      setPasswordError("Please enter a password");
      return;
    }

    if (password.length < 8) {
      setPasswordError("The password must be 8 characters or longer");
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match!");
      return;
    }

    // Checking for at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      setPasswordError("The password must contain at least one uppercase character");
      return;
    }

    // Checking for at least one number
    if (!/\d/.test(password)) {
      setPasswordError("The password must contain at least one number");
      return;
    }

    // Checking for at least one special character
    if (!/[@#$%^&+=!]/.test(password)) {
      setPasswordError("The password must contain at least one special character (@#$%^&+=!)");
      return;
    }

    // Authentication calls will be made here...
    /*if (
      !usernameError === "" &&
      !passwordError === "" &&
      !confirmPasswordError === ""
    )
      return;*/
    handleSignup();
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post("http://localhost:3000/account/register", {
        username: username,
        password: password,
      });
      console.log(res);
      console.log(res.data._id);
      //props.setLoggedIn(true);
      //props.setUsername(username);
      navigate("/createUserInfo", {
        state: { id: res.data._id, username: username },
      });

      // If user not logged in, make login request
      //if (!authController.isAuthenticated()) {
      // Check if email or password is null
      //if (email === "" || password === "") {throw new Error("User not logged in")}
      /*
        .then((r) => r.json())
        .then((r) => {
          if ("success" === r.message) {
            localStorage.setItem(
              "user",
              JSON.stringify({ email, token: r.token })
            );
            props.setLoggedIn(true);
            props.setEmail(email);
            navigate("/");
          } else {
            window.alert("Wrong email or password");
          }
        });*/
      console.log("account created");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // Handle 409 Conflict error
        console.error("409 Conflict:", error.response.data);
        setUsernameError(
          "Account with same username already exists! Try another username"
        );
      } else if (error.response) {
        // The request was made and the server responded with a status code
        console.error("Server responded with status:", error.response.status);
        console.error("Response data:", error.response.data);
        console.error("Response headers:", error.response.headers);
        window.alert(error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error);
        window.alert("No response received from server: " + error.message);
      } else {
        // Something happened in setting up the request that triggered an error
        console.error("Error setting up the request:", error.message);
        window.alert("Error setting up the request: " + error.message);
      }
      // Handle error
    }
  };

  const containerStyle = {
    borderRadius: "20px",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.5)",
    padding: "20px",
    textAlign: "center",
    margin: "20px",
    marginTop: "15vh",
    maxWidth: "600px",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "white",
  };

  const fullScreenBackgroundStyle = {
    width: "100vw",
    height: "100vh",
    backgroundImage: `url(${BackgroundImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: -1,
  };

  return (
    <div>
      {" "}
      {/* Wrap everything in a single parent div */}
      <div style={fullScreenBackgroundStyle} /> {/* Background image */}
      <div style={containerStyle}>
        {" "}
        {/* Container */}
        <div className={"signupContainer"}>
          <div className={"titleContainer"}>
            {/* Insert the <img> element here */}
            <img
              src={SwoleMates}
              alt="SwoleMates Logo"
              style={{ width: "400px", height: "auto" }}
            />
            <div>Create Account</div>
          </div>
          <br />
          {/* Username Input */}
          <div className={"inputContainer"}>
            <input
              value={username}
              placeholder="Enter your username here"
              onChange={(ev) => setUsername(ev.target.value)}
              className={"inputBox"}
            />
            <label className="errorLabel">{usernameError}</label>
          </div>
          <br />
          {/* Password */}
          <div className={"inputContainer"} style={{ marginTop: "9px" }}>
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
              onClick={togglePasswordVisibility}
              className={"passwordSU"}
              style={{ cursor: "pointer" }}
            />
            <label className="errorLabel">{passwordError}</label>
          </div>
          {/* Confirm Password */}
          <div className={"inputContainer"}>
            <input
              value={confirmPassword}
              placeholder="Confirm your password here"
              onChange={(ev) => setConfirmPassword(ev.target.value)}
              type={showConfirmPassword ? "text" : "password"} // Toggle input type based on showConfirmPassword state
              className={"inputBox"}
            />
            <img
              src={showConfirmPassword ? HidePW : ShowPW} // Show or hide password icon based on showConfirmPassword state
              alt={showConfirmPassword ? "Hide Password" : "Show Password"}
              onClick={toggleConfirmPasswordVisibility}
              className={"passwordSU"}
              style={{ cursor: "pointer" }}
            />
            <label className="errorLabel">{confirmPasswordError}</label>
          </div>
          <br />
          <div className={"inputContainer"}>
            <input
              className={"inputButton"}
              type="button"
              onClick={onButtonClick}
              value={"Sign Up"}
            />
          </div>
          <div>
            Already have an account?
            <button className="redUnderlineButton" onClick={navigateToLogIn}>
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
