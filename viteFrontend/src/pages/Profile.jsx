import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Avatar, IconButton } from "@mui/material";
import DefaultAvatar from "../assets/Zenitsu.png";
import "../profile.css";

const Profile = (props) => {
  //console.log(window.location.origin);
  const [profilePicture, setProfilePicture] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [interests, setInterests] = useState([]);
  const [userData, setUserData] = useState({});
  const [newData, setNewData] = useState({});
  const [errors, setErrors] = useState({});
  const [userID, setUserID] = useState("");

  const navigate = useNavigate();
  const handleSignOut = () => {
    //  the sign-out logic (like clearing tokens)
    localStorage.removeItem("user");
    props.setLoggedIn(false);
    props.setUsername("");
    navigate("/login");
  };
  const interestColors = {
    Running: "#FF7043",
    HIIT: "#AB47BC",
    Yoga: "#5C6BC0",
    Pilates: "#42A5F5",
    Dance: "#26A69A",
    Hiking: "#9CCC65",
    Boxing: "#D4E157",
    Cycling: "#EF5350",
    Rowing: "#EC407A",
    Weightlifting: "#FFA726",
    Swimming: "#8D6E63",
    CrossFit: "#78909C",
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
  const genderLabels = {
    MALE: "Male",
    FEMALE: "Female",
    "PREFER NOT TO SAY": "Other",
  };
  const loadProfilePictureToBlob = async (picture) => {
    let blob = await fetch(picture).then((r) => r.blob());
    setProfilePicture(blob);
  };
  useEffect(() => {
    const verify = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      try {
        const res = await axios.post(
          "http://localhost:3000/account/check-jwt",
          {
            token: user.token,
          }
        );
        console.log(res);
        console.log(res.data.userId);
        setUserID(res.data.userId);
        const resp = await axios.get(
          `http://localhost:3000/user/${res.data.userId}`
        );
        console.log("userData:");
        console.log(resp.data);
        setUserData({
          name: resp.data.name,
          email: resp.data.email,
          gender: genderLabels[resp.data.gender],
          aboutMe: resp.data.aboutMe,
          interests: resp.data.interest.map((interest, index) => ({
            name: interest,
            color: interestColors[interest], // Generate color dynamically
          })),
          profilePicUrl: resp.data.profilePicture,
        });
        setNewData({
          name: resp.data.name,
          email: resp.data.email,
          gender: resp.data.gender,
          aboutMe: resp.data.aboutMe,
          //profilePicUrl: resp.data.profilePicture,
        });
        loadProfilePictureToBlob(
          `http://localhost:3000/${userData.profilePicUrl}`
        );
        setInterests(resp.data.interest);
        console.log(interests);
      } catch (error) {
        if (error.response) {
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
      }
    };
    verify();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
    console.log(newData);
    //window.location.reload();
    setErrors(validateValues());
    setSubmitting(true);
    setIsEditing(false);
  };
  const handleCancel = () => {
    window.location.reload();
  };
  const validateValues = () => {
    let errors = {};

    if ("" === newData.name) {
      errors.name = "Please enter your name";
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(newData.email)) {
      errors.email = "Please enter a valid email";
    }
    return errors;
  };
  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      console.log("sent");
      updateUser();
    }
  }, [errors]);
  const updateUser = async () => {
    try {
      const formData = new FormData();
      if (!profilePicture) {
        let blob = await fetch(DefaultAvatar).then((r) => r.blob());
        const defaultFile = new File([blob], "DefaultAvatar.png", {
          type: "image/png",
        });
        formData.append("photo", defaultFile);
      } else {
        formData.append("photo", profilePicture);
      }
      formData.append("email", newData.email);
      formData.append("name", newData.name);
      formData.append("aboutMe", newData.aboutme);
      formData.append("gender", newData.gender);
      formData.append("interest", interests);
      formData.append("type", "profilePicture");
      console.log(formData);
      const res = await axios.put(
        `http://localhost:3000/user/${userID}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      //console.log(JSON.stringify({ username, token: res.data }));
      console.log(res);
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
  /*useEffect(() => {
    // Mock user data
    setUserData({
      name: "Zenitsu Agatsuma",
      email: "Zenitsu.Agatsuma@gmail.com",
      gender: "Male",
      aboutMe:
        "Hey there, I'm Zenitsu Agatsuma, possibly the most reluctant Demon Slayer you'll ever meet. Despite my tendency to, well, freak out at the slightest hint of danger, I've somehow landed myself in the thick of demon-slaying action. Trained in the art of Thunder Breathing—which, trust me, is way cooler in action than it sounds—I've got this unique knack of becoming a formidable fighter the moment I pass out from fear. It's a weird talent, but it's saved my skin more times than I can count. Off the battlefield, you might find me swooning over any girl who gives me the time of day or indulging in my sweet tooth (I have a bit of a thing for anything sugary). Despite my perpetual state of panic and my, uh, less-than-stellar confidence, I dream of a peaceful life free from demons. But until that day comes, I'll be here, zapping demons in my sleep and trying to be the bravest version of myself, one terrified step at a time.",
      interests: [
        { name: "Running", color: "#FF7043" }, // Deep orange
        { name: "HIIT", color: "#AB47BC" }, // Purple
        { name: "Yoga", color: "#5C6BC0" }, // Indigo
        { name: "Pilates", color: "#42A5F5" }, // Blue
        { name: "Dance", color: "#26A69A" }, // Teal
        { name: "Hiking", color: "#9CCC65" }, // Light green
        { name: "Boxing", color: "#D4E157" }, // Lime
        { name: "Cycling", color: "#EF5350" }, // Red
        { name: "Rowing", color: "#EC407A" }, // Pink
        { name: "Weightlifting", color: "#FFA726" }, // Orange
        { name: "Swimming", color: "#8D6E63" }, // Brown
        { name: "CrossFit", color: "#78909C" }, // Blue Grey
      ],
      profilePicUrl: DefaultAvatar, // Placeholder image URL
    });
  }, []);*/
  return (
    <div>
      <Navbar />
      <div
        style={{
          textDecoration: "underline",
          fontFamily: "'monaco', monospace",
          textAlign: "center",
          fontSize: "20px",
          fontWeight: "bolder",
        }}
      >
        {props.username + (props.username.endsWith("s") ? "'" : "'s")} Profile
      </div>
      {isEditing ? (
        <div className={"mainContainer"}>
          {/*Input for Profile Picture*/}
          <div>Click on the Profile Picture to upload an image</div>
          <br />
          <div className={"inputContainer"}>
            <input
              accept="image/*"
              id="contained-button-file"
              type="file"
              onChange={(event) => setProfilePicture(event.target.files[0])}
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
                    /*profilePicture
                      ? URL.createObjectURL(profilePicture)
                      : `http://localhost:3000/${userData.profilePicUrl}`*/
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
          </div>
          <br />
          {/* Input for Name */}
          <div>Name</div>
          <div className={"inputContainer"}>
            <input
              name="name"
              value={newData.name}
              placeholder="Enter your name here"
              onChange={handleInputChange}
              className={"inputBox"}
              style={{ border: errors.name ? "1px solid red" : null }}
            />
            {errors.name ? (
              <label className="errorLabel">{errors.name}</label>
            ) : null}
          </div>
          <br />
          {/* Input for Email */}
          <div>Email</div>
          <div className={"inputContainer"}>
            <input
              name="email"
              value={newData.email}
              placeholder="Enter your email here"
              onChange={handleInputChange}
              className={"inputBox"}
              style={{ border: errors.email ? "1px solid red" : null }}
            />
            {errors.email ? (
              <label className="errorLabel">{errors.email}</label>
            ) : null}
          </div>
          <br />
          <div>About Me!</div>
          <div className={"inputContainer"}>
            <textarea
              name="aboutMe"
              value={newData.aboutMe}
              placeholder="Tell us about yourself..."
              onChange={handleInputChange}
              className={"inputBox"}
              style={{ fontFamily: "sans-serif", height: "120px" }}
            />
          </div>
          <br />
          {/*Dropdown for Gender*/}
          <form id="editProfile" onSubmit={handleSubmit}>
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
                  name="gender"
                  value={newData.gender}
                  onChange={handleInputChange}
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="PREFER NOT TO SAY">Other</option>
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
            </div>
          </form>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
            }}
          >
            <button form="editProfile" className="profileButton" type="submit">
              Save Changes
            </button>
            <button className="profileButton" onClick={() => handleCancel()}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="profile-container">
          <Avatar
            src={`http://localhost:3000/${userData.profilePicUrl}`}
            style={{
              width: "150px",
              height: "150px",
            }}
            className="profile-pic"
          />
          <h1>{userData.name}</h1>
          <p>Email: {userData.email}</p>
          <p>Gender: {userData.gender}</p>
          <div className="interests-container">
            {userData.interests &&
              userData.interests.map((interest, index) => (
                <span
                  key={index}
                  className="interest-tag"
                  style={{ backgroundColor: interest.color }}
                >
                  {interest.name}
                </span>
              ))}
          </div>

          <div className="about-me">
            <p>About Me:</p>
            <p>{userData.aboutMe}</p>
          </div>
          {isEditing ? (
            <div>
              {/* Editing form goes here */}
              <button
                className="profileButton"
                onClick={() => setIsEditing(false)}
              >
                Save Changes
              </button>
            </div>
          ) : (
            <div>
              {/* Display profile information */}
              <button
                className="profileButton"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            </div>
          )}
          <button className="profileButton" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Navbar from '../components/Navbar';
// import { Box, Typography, Avatar, List, ListItem, ListItemText } from '@mui/material';

// const Profile = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Replace 'userId' with the actual user ID you want to fetch
//     const userId = '660c1d4c98429a652603208d';
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3000/users/${userId}`); // Make sure the URL matches your backend route
//         setUser(response.data);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchUserData();
//   }, []); // The empty array ensures this effect runs only once after the initial render

//   return (
//     <div>
//       <Navbar />
//       <h1>This is the profile page</h1>
//       {user ? (
//         <Box sx={{ maxWidth: 600, margin: 'auto', textAlign: 'center' }}>
//           <Avatar
//             alt={user.name}
//             src={user.profilePicture}
//             sx={{ width: 100, height: 100, margin: 'auto' }}
//           />
//           <Typography variant="h4">{user.name}</Typography>
//           <Typography variant="body1">{user.email}</Typography>
//           <Typography variant="body1">{user.gender}</Typography>
//           <Typography variant="body1">{user.aboutMe}</Typography>
//           <Typography variant="h6">Interests</Typography>
//           <List>
//             {user.interest.map((interest, index) => (
//               <ListItem key={index}>
//                 <ListItemText primary={interest} />
//               </ListItem>
//             ))}
//           </List>
//         </Box>
//       ) : (
//         <Typography>Loading...</Typography>
//       )}
//     </div>
//   );
// };

// export default Profile;

// import React, { useEffect, useState } from 'react';
// import Navbar from '../components/Navbar';

// // Assuming you're running your backend on localhost:5000
// const API_URL = 'http://localhost:3000/user/'; // Update with your actual API URL

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const userId = 'someUserId'; // You should replace this with the actual user ID

//   useEffect(() => {
//     // Function to fetch user data
//     const fetchUserData = async () => {
//       try {
//         const response = await fetch(`${API_URL}/${userId}`);
//         if (!response.ok) {
//           throw new Error('Could not fetch user data');
//         }
//         const data = await response.json();
//         setUser(data);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchUserData();
//   }, [userId]); // This effect depends on userId, so it runs when userId changes

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <Navbar/>
//       <h1>This is the profile page</h1>
//       <div>
//         <h2>{user.name}</h2>
//         <p>Email: {user.email}</p>
//         <p>Gender: {user.gender}</p>
//         <p>About Me: {user.aboutMe}</p>
//         {user.profilePicture && (
//           <img src={user.profilePicture} alt="Profile" style={{ width: '100px', height: '100px' }} />
//         )}
//         <p>Interests:</p>
//         <ul>
//           {user.interest.map((interest, index) => (
//             <li key={index}>{interest}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Profile;
