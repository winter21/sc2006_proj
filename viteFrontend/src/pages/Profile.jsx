// import React from 'react';
// import Navbar from '../components/Navbar';

// const Profile = () => {
//   return (
//     <div>
//       <Navbar/>
//       <h1>This is the profile page</h1>
//     </div>
//   );
// };

// export default Profile;























import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import DefaultAvatar from "../assets/Zenitsu.png";

// Mock user data
const userData = {
  name: "Zenitsu Agatsuma",
  email: "Zenitsu.Agatsuma@gmail.com",
  gender: "Male",
  aboutMe:
    "Hey there, I'm Zenitsu Agatsuma, possibly the most reluctant Demon Slayer you'll ever meet. Despite my tendency to, well, freak out at the slightest hint of danger, I've somehow landed myself in the thick of demon-slaying action. Trained in the art of Thunder Breathing—which, trust me, is way cooler in action than it sounds—I've got this unique knack of becoming a formidable fighter the moment I pass out from fear. It's a weird talent, but it's saved my skin more times than I can count. Off the battlefield, you might find me swooning over any girl who gives me the time of day or indulging in my sweet tooth (I have a bit of a thing for anything sugary). Despite my perpetual state of panic and my, uh, less-than-stellar confidence, I dream of a peaceful life free from demons. But until that day comes, I'll be here, zapping demons in my sleep and trying to be the bravest version of myself, one terrified step at a time.",
  interests: [
    { name: "Weightlifting", color: "#FF7043" }, // Deep orange
    { name: "Running", color: "#AB47BC" }, // Purple
    { name: "Yoga", color: "#5C6BC0" }, // Indigo
    { name: "Cycling", color: "#42A5F5" }, // Blue
    { name: "Swimming", color: "#26A69A" }, // Teal
    { name: "HIIT", color: "#9CCC65" }, // Light green
    { name: "Pilates", color: "#D4E157" }, // Lime
    { name: "Boxing", color: "#EF5350" }, // Red
    { name: "CrossFit", color: "#EC407A" }, // Pink
    { name: "Dance", color: "#FFA726" }, // Orange
    { name: "Hiking", color: "#8D6E63" }, // Brown
    { name: "Rowing", color: "#78909C" }, // Blue Grey
  ],
  profilePicUrl: DefaultAvatar, // Placeholder image URL
};

const Profile = (props) => {
  const navigate = useNavigate();
  const handleSignOut = () => {
    //  the sign-out logic (like clearing tokens)
    localStorage.removeItem("user");
    props.setLoggedIn(false);
    props.setUsername("");
    navigate("/login");
  };
  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <div
          className="profile-pic"
          style={{ backgroundImage: `url(${userData.profilePicUrl})` }}
        ></div>
        <h1>{userData.name}</h1>
        <p>Email: {userData.email}</p>
        <p>Gender: {userData.gender}</p>
        <div className="interests-container">
          {userData.interests.map((interest, index) => (
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
        <button onClick={handleSignOut}>Sign Out</button>
      </div>

      <style jsx>{`
        .profile-container {
          text-align: center;
          margin-top: 20px;
        }

        .profile-pic {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background-size: cover;
          background-position: center center;
          margin: 0 auto;
          border: 3px solid red;
          box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
        }

        .about-me {
          margin: 20px auto;
          padding: 20px;
          max-width: 80%;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          text-align: left;
        }

        .about-me p:first-child {
          font-size: 20px;
          font-weight: bold;
          color: #333;
        }

        .interests-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          margin-top: 20px;
        }

        .interest-tag {
          padding: 5px 10px;
          border-radius: 15px;
          color: white;
          font-size: 14px;
        }

        button {
          margin-top: 20px;
          padding: 10px 20px;
          background-color: red;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        button:hover {
          background-color: darkred;
        }
      `}</style>
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
