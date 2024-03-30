// WELCOME PAGE

import React from "react";
import { useNavigate } from "react-router-dom";
import SwoleMates from "../assets/SwoleMates.png";

const Start = (props) => {
  const { loggedIn, username } = props;
  const navigate = useNavigate();

  const onButtonClick = () => {
    // You'll update this function later Done :)
    //navigate("/login");
    if (loggedIn) {
      localStorage.removeItem("suser");
      props.setLoggedIn(false);
      props.setUsername("");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="mainContainer">
      <div className={"titleContainer"}>
        <div>Welcome!</div>
        {/* Insert the <img> element here */}
        <img
          src={SwoleMates}
          alt="SwoleMates Logo"
          style={{ width: "400px", height: "auto" }}
        />
      </div>
      <div>Sweat Together, Swole Together!</div>
      <div className={"buttonContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onButtonClick}
          value={loggedIn ? "Log Out" : "Log In"}
        />
        {loggedIn ? <div>Your username is {username}</div> : <div />}
      </div>
    </div>
  );
};

export default Start;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import SwoleMates from "../assets/SwoleMates.png";

// const Start = (props) => {
//   const { loggedIn, username } = props;
//   const navigate = useNavigate();

//   const onButtonClick = () => {
//     if (loggedIn) {
//       localStorage.removeItem("user");
//       props.setLoggedIn(false);
//     } else {
//       navigate("/login");
//     }
//   };

//   return (
//     <div className="mainContainer" style={mainContainerStyle}>
//       <div className="titleContainer">
//         <div>Welcome!</div>
//         <img
//           src={SwoleMates}
//           alt="SwoleMates Logo"
//           style={{ width: "400px", height: "auto" }}
//         />
//       </div>
//       <div>Sweat Together, Swole Together!</div>
//       <div className="buttonContainer">
//         <input
//           className="inputButton"
//           type="button"
//           onClick={onButtonClick}
//           value={loggedIn ? "Log Out" : "Log In"}
//         />
//         {loggedIn ? <div>Your username is {username}</div> : null}
//       </div>
//     </div>
//   );
// };

// // You can adjust the border-radius and box-shadow as per your design requirements
// const mainContainerStyle = {
//   border: "1px solid #ccc", // Optional: Adds a slight border
//   borderRadius: "20px", // This rounds the edges
//   boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)", // This adds a deeper shadow
//   padding: "20px", // Adds some space inside the box
//   margin: "20px auto", // Centers the box with auto left and right margins
//   maxWidth: "500px", // Shortens the maximum width of the box
//   textAlign: "center", // Centers the text inside the box
// };

// export default Start;
