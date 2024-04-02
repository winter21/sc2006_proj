import React, { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import SwoleMates from "../assets/SwoleMates.png";
import DefaultAvatar from "../assets/Zenitsu.png";
import { Avatar, IconButton } from "@mui/material";
import axios from "axios";
//import IconButton from '@material-ui/core/IconButton';
//email and name required
//email must be unique
const CreateUserInfo = (props) => {
  //const { username } = props;
  let location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [aboutme, setAboutMe] = useState("");
  const [interests, setInterests] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);
  let id = location.state?.id;
  let username = location.state?.username || "";
  const handleProfilePictureChange = (file) => {
    setProfilePicture(file); // Update the profile picture state
    console.log(profilePicture);
    console.log(URL.createObjectURL(profilePicture));
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  /*const [email, setEmail] = useState("");*/
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
    console.log(gender);
  };

  const handleAboutMe = (event) => {
    setAboutMe(event.target.value);
  };

  const handleInterestChange = (interest) => {
    if (!interests.includes(interest)) {
      setInterests([...interests, interest]);
    } else {
      setInterests(interests.filter((item) => item !== interest));
    }
    console.log(interests);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    // Navigate page here too
    // if (!usernameError === "" && !passwordError === "") return;
    createUserI();
  };

  const createUserI = async () => {
    try {
      const formData = new FormData();
      formData.append("photo", profilePicture);
      formData.append("email", email);
      formData.append("name", name);
      formData.append("aboutMe", aboutme);
      formData.append("gender", gender);
      formData.append("interest", interests);
      formData.append("accountID", id);
      formData.append("type", "profilePicture");
      const res = await axios.post("http://localhost:3000/user", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }); /* {
        email: email,
        name: name,
        aboutMe: aboutme,
        gender: gender,
        interest: interests,
        accountID: id,
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
      navigate("/onboardingPg1", { replace: true });
      /*localStorage.setItem(
        "user",
        JSON.stringify({ username, token: res.data })
      );
      props.setLoggedIn(true);
      props.setUsername(username);
      navigate(from, { replace: true });*/
      //if (!authController.isAuthenticated()) {
      /*
      hen((r) => {
                  });*/
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Error 401:", error.response.data);
        setPasswordError(error.response.data.message);
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

  const workoutInterestExamples = [
    "Weightlifting",
    "Running",
    "Yoga",
    "Cycling",
    "Swimming",
    "HIIT",
    "Pilates",
    "Boxing",
    "CrossFit",
    "Dance",
    "Hiking",
    "Rowing",
  ];
  if (username === "") return <Navigate to="/home" replace />;
  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        {/* Insert the <img> element here */}
        <img
          src={SwoleMates}
          alt="SwoleMates Logo"
          style={{ width: "400px", height: "auto" }}
        />
        <p style={{ color: "red", textAlign: "center" }}>
          Account with username "{username}" successfully created
        </p>
        <div style={{ textDecoration: "underline" }}>Your Profile</div>
      </div>
      <br />

      {/*Input for Profile Picture*/}
      <div>Click on the Profile Picture to upload an image</div>
      <br />
      <div className={"inputContainer"}>
        <input
          accept="image/*"
          //className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
          onChange={(event) =>
            handleProfilePictureChange(event.target.files[0])
          }
          style={{
            display: "none",
          }}
        />
        <label htmlFor="contained-button-file">
          <IconButton component="span">
            <Avatar
              src={
                profilePicture
                  ? URL.createObjectURL(profilePicture)
                  : DefaultAvatar
              }
              style={{
                margin: "10px",
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                border: "8px solid #ccc",
              }}
            />
          </IconButton>
        </label>
        {/*
        {profilePicture ? (
          <img
            src={URL.createObjectURL(profilePicture)}
            alt="Profile"
            style={{
              margin: "auto",
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              border: "8px solid #ccc",
            }}
          />
        ) : (
          <img
            src={DefaultAvatar}
            alt="Default Avatar"
            style={{
              margin: "auto",
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              border: "8px solid #ccc",
            }}
          />
        )}
        <input
          id="profile-picture-input"
          type="file"
          accept="image/*"
          onChange={(event) =>
            handleProfilePictureChange(event.target.files[0])
          }
          style={{ display: "auto" }}
        />*/}
      </div>
      <br />
      {/* Input for Name */}
      <div>Name</div>
      <div className={"inputContainer"}>
        <input
          value={name}
          placeholder="Enter your name here"
          onChange={handleNameChange}
          className={"inputBox"}
        />
      </div>
      <br />

      {/*<div className={"inputContainer"}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={handleNameChange} />
      </div>
  <br />*/}

      {/* Input for Email */}
      <div>Email</div>
      <div className={"inputContainer"}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={handleEmailChange}
          className={"inputBox"}
        />
      </div>
      <br />

      {/*<div className={"inputContainer"}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <br />*/}

      <div>About Me!</div>
      <div className={"inputContainer"}>
        <textarea
          value={aboutme}
          placeholder="Tell us about yourself..."
          onChange={handleAboutMe}
          className={"inputBox"}
          style={{ fontFamily: "sans-serif", height: "120px" }}
        />
      </div>
      <br />

      {/*Dropdown for Gender*/}
      <form onSubmit={handleSubmit}>
        <div style={{ textAlign: "center" }}>Gender:</div>
        <div className={"inputContainer"}>
          <select id="Gender" value={gender} onChange={handleGenderChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <br />

        <div style={{ textAlign: "center" }}>Workout Interests:</div>
        <br />
        <div className={"interestsContainer"}>
          {workoutInterestExamples.map((interest, index) => (
            <div
              key={index}
              className={`interestItem ${
                interests.includes(interest) ? "selectedWorkout" : ""
              }`}
              onClick={() => handleInterestChange(interest)}
            >
              {interest}
            </div>
          ))}
        </div>
        <br />

        {/* Form Submit Button */}
        <div className={"inputContainer"}>
          <input className={"inputButton"} type="submit" value={"Next"} />
        </div>
      </form>
    </div>
  );
};

export default CreateUserInfo;
