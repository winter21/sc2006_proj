import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import SwoleMates from "../assets/SwoleMates.png";
import DefaultAvatar from "../assets/Zenitsu.png";
import { Avatar, IconButton } from "@mui/material";
import axios from "axios";
//import IconButton from '@material-ui/core/IconButton';
//email and name required
//email must be unique
const CreateUserInfo = (props) => {
  let location = useLocation();
  const navigate = useNavigate();
  /*const [genderError, setGenderError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");*/
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
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

  const validateValues = () => {
    let errors = {};

    if ("" === name) {
      errors.name = "Please enter your name";
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      errors.email = "Please enter a valid email";
    }
    if ("" === gender) {
      errors.gender = "Please select a gender";
    }
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validateValues());
    setSubmitting(true);
    // Handle form submission here
    /*setGenderError("");
    setEmailError("");
    setNameError("");
    if ("" === name) {
      setNameError("Please enter your name");
    }
    /*if ("" === email) {
      setEmailError("Please enter your email");
      return;
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email");
    }
    if ("" === gender) {
      setGenderError("Please select a gender");
    }
    if (!genderError === "" && !emailError === "" && !nameError === "") return;
    console.log("sent");
    createUserI();*/
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      console.log("sent");
      createUserI();
    }
  }, [errors]);

  const createUserI = async () => {
    try {
      const formData = new FormData();
      /*if (profilePicture) {
        formData.append("photo", profilePicture);
      } else {
        const defaultFile = new File([DefaultAvatar], "DefaultAvatar.png", {
          type: "image/png",
        });
        formData.append("photo", defaultFile);
        console.log(defaultFile);
      }

      const file = new File([DefaultAvatar], "Zenitsu.png", {
        type: "image/png",
      });
      formData.append("photo", profilePicture || file);*/
      if (!profilePicture) {
        let blob = await fetch(DefaultAvatar).then((r) => r.blob());
        const defaultFile = new File([blob], "DefaultAvatar.png", {
          type: "image/png",
        });
        formData.append("photo", defaultFile);
      } else {
        formData.append("photo", profilePicture);
      }
      formData.append("email", email);
      formData.append("name", name);
      formData.append("aboutMe", aboutme);
      formData.append("gender", gender);
      formData.append("interest", interests);
      formData.append("accountID", id);
      formData.append("type", "profilePicture");
      console.log(formData);
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
      localStorage.setItem(
        "user",
        JSON.stringify({ username, token: res.data })
      );
      props.setLoggedIn(true);
      props.setUsername(username);
      navigate("/onboardingPg1", { replace: true });
      //if (!authController.isAuthenticated()) {
      /*
      hen((r) => {
                  });*/
    } catch (error) {
      if (error.response && error.response.status === 409) {
        console.error("Error 409:", error.response.data);
        setErrors({ email: error.response.data.message });
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
          style={{ border: errors.name ? "1px solid red" : null }}
        />
        {errors.name ? (
          <label className="errorLabel">{errors.name}</label>
        ) : null}
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
          style={{ border: errors.email ? "1px solid red" : null }}
        />
        {errors.email ? (
          <label className="errorLabel">{errors.email}</label>
        ) : null}
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
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          Gender:
          <div className={"inputContainer"}>
            <select
              id="Gender"
              value={gender}
              onChange={handleGenderChange}
              style={{ border: errors.gender ? "1px solid red" : null }}
            >
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="PREFER NOT TO SAY">Other</option>
            </select>
            {errors.gender ? (
              <label
                style={{
                  display: "block",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  width: "100%", // Ensure the label takes up the full width
                  margin: "auto",
                  color: "red",
                  fontSize: "12px",
                }}
              >
                {errors.gender}
              </label>
            ) : null}
          </div>
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
