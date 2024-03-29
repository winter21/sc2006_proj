import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SwoleMates from "../assets/SwoleMates.png";
import ShowPW from "../assets/ShowPW.png";
import HidePW from "../assets/HidePW.png";
import axios from "axios";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility

  const navigate = useNavigate();

  const navigateToSignUp = () => {
    navigate("/signup");
  };
  const navigateToRequestPasswordReset = () => {
    navigate("/request-reset-password");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the state for password visibility
  };

  const onButtonClick = () => {
    /*    disable for testing purposes --- added by KX
    props.setLoggedIn(true);
    props.setEmail(email);
    localStorage.setItem("user", JSON.stringify({ email })); //, token: r.token}))
    navigate("/protected");
    //navigate("/")
    */
    // You'll update this function later...
    // Set initial error values to empty
    setUsernameError("");
    setPasswordError("");

    // Check if the user has entered both fields correctly
    if ("" === username) {
      setUsernameError("Please enter your username");
      return;
    }
    /*
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email");
      return;
    }
*/
    if ("" === password) {
      setPasswordError("Please enter a password");
      return;
    }

    if (password.length < 8) {
      setPasswordError("The password must be 8 characters or longer");
      return;
    }

    // Authentication calls will be made here...
    login();
  };

  const login = async () => {
    try {
      const res = await axios
        .post("http://localhost:3000/account/login", {
          username: username,
          password: password,
        })
        .then((result) => {
          console.log("test worked");
          window.alert("test worked");
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
            window.alert("test error");
          }
        });
      console.log(res);
      props.setUsername(username);
      window.alert("success");
      //navigate("/createUserInfo");

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
          value={username}
          placeholder="Enter your Username here"
          onChange={(ev) => setUsername(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{usernameError}</label>
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
      <div>
        <button
          className="redUnderlineButton"
          onClick={navigateToRequestPasswordReset}
        >
          Forgotten Password
        </button>
      </div>
    </div>
  );
};
export default Login;
