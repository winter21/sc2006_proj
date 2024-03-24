import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SwoleMates from "../assets/SwoleMates.png";

const CreateUserInfo = (props) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [interests, setInterests] = useState([]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
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
        <div>Tell us about yourself!</div>
      </div>
      <br />

      {/* Input for Name */}
      <div className={"inputContainer"}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={handleNameChange} />
      </div>
      <br />

      {/* Input for Email */}
      <div className={"inputContainer"}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <br />

      {/* Horizontal Line */}
      <hr />

      <p>About Me!</p>

      {/*Dropdown for Gender*/}
      <form onSubmit={handleSubmit}>
        <div className={"inputContainer"}>
          <label htmlFor="Gender">Gender:</label>
          <select id="Gender" value={gender} onChange={handleGenderChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <br />

        <div>Workout Interests:</div>
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
          <input
            className={"inputButton"}
            type="button"
            onClick={handleSubmit}
            value={"Next"}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateUserInfo;
