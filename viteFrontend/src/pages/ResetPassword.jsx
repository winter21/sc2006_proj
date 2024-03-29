import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SwoleMates from "../assets/SwoleMates.png";
import ShowPW from "../assets/ShowPW.png";
import HidePW from "../assets/HidePW.png";
import axios from "axios";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const token = urlParams.get("token");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the state for password visibility
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword); // Toggle the state for password visibility
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password.length < 8) {
      setPasswordError("The password must be 8 characters or longer");
      return;
    }

    if (password != confirmPassword) {
      setPasswordError("Password do not Match");
      return;
    }

    const requestPasswordReset = axios.put(
      "http://localhost:3000/account/password-reset",
      {
        token: token,
        password: password,
      }
    );
    requestPasswordReset
      .then((result) => {
        navigate("/login");
      })
      .catch((error) => {
        if (error.response) {
          setPasswordError("Invalid token");
          console.log(error.response.data);
        }
      });
  };
  return (
    <div className="mainContainer">
      <div className="titleContainer">
        <img
          src={SwoleMates}
          alt="SwoleMates Logo"
          style={{ width: "400px", height: "auto" }}
        />
        <h2>Reset Password</h2>
      </div>
      <br />
      <div className="inputContainer">
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(event) => setPassword(event.target.value)}
          type={showPassword ? "text" : "password"}
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
        <br />
        <br />
        <input
          value={confirmPassword}
          placeholder="Enter your password here"
          onChange={(event) => setConfirmPassword(event.target.value)}
          type={showConfirmPassword ? "text" : "password"}
          className={"inputBox"}
        />
        <img
          src={showConfirmPassword ? HidePW : ShowPW} // Show or hide password icon based on showPassword state
          alt={showConfirmPassword ? "Hide Password" : "Show Password"}
          onClick={toggleConfirmPasswordVisibility}
          className={"passwordSU"}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={handleSubmit}
          value={"Submit"}
        />
      </div>
    </div>
  );
};

export default ResetPassword;
