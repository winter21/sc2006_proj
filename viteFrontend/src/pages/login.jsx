import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SwoleMates from "../assets/SwoleMates.png";
import BackgroundImage from "../assets/RedBg.jpg";
import ShowPW from "../assets/ShowPW.png";
import HidePW from "../assets/HidePW.png";
import axios from "axios";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility

  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/home";

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
    props.setEmail(email);
    localStorage.setItem("user", JSON.stringify({ email })); //, token: r.token}))
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
    //if (!usernameError === "" && !passwordError === "") return;
    login();
  };

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:3000/account/login", {
        username: username,
        password: password,
      }); /*
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
      */
      //console.log(JSON.stringify({ username, token: res.data }));
      console.log(res);
      localStorage.setItem(
        "user",
        JSON.stringify({ username, token: res.data })
      );
      props.setLoggedIn(true);
      props.setUsername(username);
      navigate(from, { replace: true });
      //if (!authController.isAuthenticated()) {
      /*
      hen((r) => {
                  });*/
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Error 401:", error.response.data);
        setPasswordError(error.response.data.message);
      } else if (error.response && error.response.status === 403) {
        console.error("user profile not created");
        console.log(username);
        console.log(error.response.data.accountId);
        navigate("/createUserInfo", {
          state: { id: error.response.data.accountId, username: username },
        });
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
        console.log(error);
        //window.alert(error.response.data.message);
        console.error("Error setting up the request:", error.message);
        window.alert("Error setting up the request: " + error.message);
      }
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
        <div className={"loginContainer"}>
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
              placeholder="Enter your username here"
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
      </div>
    </div>
  );
};
export default Login;
