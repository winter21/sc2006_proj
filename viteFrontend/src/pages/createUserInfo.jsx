import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SwoleMates from "../assets/SwoleMates.png";
import DefaultAvatar from "../assets/Zenitsu.png";

const CreateUserInfo = (props) => {
  const { username } = props;
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [aboutme, setAboutMe] = useState("");
  const [interests, setInterests] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);

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
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    // Navigate page here too
    // Navigate to the "home" page
    navigate("/onboardingPg1");
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

  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        {/* Insert the <img> element here */}
        <img
          src={SwoleMates}
          alt="SwoleMates Logo"
          style={{ width: "400px", height: "auto" }}
        />
        <div style={{ color: "red" }}>
          Account with username "{username}" successfully created
        </div>
        <div>Your Profile</div>
      </div>
      <br />

      {/*Input for Profile Picture*/}
      <div>Profile Picture</div>
      <br />
      <div className={"inputContainer"}>
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
          type="file"
          accept="image/*"
          onChange={(event) =>
            handleProfilePictureChange(event.target.files[0])
          }
          className={"inputBox"}
        />
      </div>
      <br />
      {/* Input for Name */}
      <div>Name</div>
      <div className={"inputContainer"}>
        <input
          value={name}
          placeholder="Zenitsu"
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
