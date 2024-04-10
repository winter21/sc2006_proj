import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SwoleMates from "../assets/SwoleMates.png";
import axios from "axios";

const RequestPasswordReset = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if ("" === email) {
      setEmailError("Please enter your email");
      return;
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    const requestPasswordReset = axios.post(
      "http://localhost:3000/account/request-password-reset",
      {
        email: email,
      }
    );
    requestPasswordReset
      .then((result) => {
        console.log("it worked");
        navigate("/login");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setEmailError("Invalid Email Case-Sensitive");
        } else {
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
          value={email}
          placeholder="Enter your email here"
          onChange={(event) => setEmail(event.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{emailError}</label>
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

export default RequestPasswordReset;
