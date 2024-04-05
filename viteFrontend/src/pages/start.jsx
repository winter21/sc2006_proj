// WELCOME PAGE

import React from "react";
import { useNavigate } from "react-router-dom";
import SwoleMates from "../assets/SwoleMates.png";
import BackgroundVideo from "../assets/BgVideo.mp4";

const Start = (props) => {
  const navigate = useNavigate();
  const { loggedIn, username } = props;

  const onButtonClick = () => {
    // You'll update this function later Done :)
    //navigate("/login");
    if (loggedIn) {
      localStorage.removeItem("user");
      props.setLoggedIn(false);
      props.setUsername("");
    } else {
      navigate("/login");
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
    transform: "translate(0, 50%)",
    zIndex: 2,
  };

  const videoContainerStyle = {
    position: "fixed",
    right: 0,
    bottom: 0,
    minWidth: "100%",
    minHeight: "100%",
    zIndex: -1,
    overflow: "hidden",
  };

  const videoOverlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  };

  return (
    <div>
      <div style={videoContainerStyle}>
        {" "}
        {/* Video container */}
        <video autoPlay loop muted style={{ width: "100%", height: "100%" }}>
          <source src={BackgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div style={videoOverlayStyle}></div> {/* Video dark overlay */}
      </div>
      <div style={containerStyle}>
        {" "}
        {/* Container */}
        <div className={"startContainer"}>
          <img
            src={SwoleMates}
            alt="SwoleMates Logo"
            style={{ width: "450px", height: "auto" }}
          />
        </div>
        <div>Sweat Together, Swole Together!</div>
        <br />
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

// const onButtonClick = () => {
//   // You'll update this function later Done :)
//   //navigate("/login");
//   if (loggedIn) {
//     localStorage.removeItem("suser");
//     props.setLoggedIn(false);
//     props.setUsername("");
//   } else {
//     navigate("/login");
//   }
// };

//   return (
//     <div className="mainContainer">
//       <div className={"titleContainer"}>
//         <div>Welcome!</div>
//         {/* Insert the <img> element here */}
// <img
//   src={SwoleMates}
//   alt="SwoleMates Logo"
//   style={{ width: "400px", height: "auto" }}
// />
//       </div>
//       <div>Sweat Together, Swole Together!</div>
// <div className={"buttonContainer"}>
//   <input
//     className={"inputButton"}
//     type="button"
//     onClick={onButtonClick}
//     value={loggedIn ? "Log Out" : "Log In"}
//   />
//   {loggedIn ? <div>Your username is {username}</div> : <div />}
// </div>
//     </div>
//   );
// };

//this is back up for only red background and not a video
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import OB1 from "../assets/OB1.png";
// import SwoleMates from "../assets/SwoleMates.png";
// import BackgroundImage from "../assets/RedBg.jpg";

// const Start = (props) => {
//     const navigate = useNavigate();
//     const { loggedIn, username } = props;

//     const onButtonClick = () => {
//       // You'll update this function later Done :)
//       //navigate("/login");
//       if (loggedIn) {
//         localStorage.removeItem("suser");
//         props.setLoggedIn(false);
//         props.setUsername("");
//       } else {
//         navigate("/login");
//       }
//     };

//     const containerStyle = {
//         borderRadius: "20px",
//         boxShadow: "0 10px 20px rgba(0, 0, 0, 0.5)",
//         padding: "20px",
//         textAlign: "center",
//         margin: "20px",
//         marginTop: "15vh",
//         maxWidth: "600px",
//         marginLeft: "auto",
//         marginRight: "auto",
//         backgroundColor: "white",
//         transform: "translate(0, 50%)",
//     };

//     const fullScreenBackgroundStyle = {
//         width: "100vw",
//         height: "100vh",
//         backgroundImage: `url(${BackgroundImage})`,
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//         backgroundSize: 'cover',
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         zIndex: -1
//     };

//     return (
//         <div> {/* Wrap everything in a single parent div */}
//             <div style={fullScreenBackgroundStyle} /> {/* Background image */}
//             <div style={containerStyle}> {/* Container */}
//                 <div className={"startContainer"}>
//                 <img
//                   src={SwoleMates}
//                   alt="SwoleMates Logo"
//                   style={{ width: "450px", height: "auto" }}
//                 />
//                 </div>
//                 <div>Sweat Together, Swole Together!</div>
//                 <br />
//                 <div className={"buttonContainer"}>
//                   <input
//                     className={"inputButton"}
//                     type="button"
//                     onClick={onButtonClick}
//                     value={loggedIn ? "Log Out" : "Log In"}
//                   />
//                   {loggedIn ? <div>Your username is {username}</div> : <div />}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Start;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import SwoleMates from "../assets/SwoleMates.png";
// import BackgroundVideo from "../assets/BgVideo.mp4";

// const Start = (props) => {
//     const navigate = useNavigate();
//     const { loggedIn, username } = props;

//     const onButtonClick = () => {
//       if (loggedIn) {
//         localStorage.removeItem("suser");
//         props.setLoggedIn(false);
//         props.setUsername("");
//       } else {
//         navigate("/login");
//       }
//     };

//     const containerStyle = {
//         borderRadius: "20px",
//         boxShadow: "0 10px 20px rgba(0, 0, 0, 0.5)",
//         padding: "20px",
//         textAlign: "center",
//         margin: "20px",
//         marginTop: "15vh",
//         maxWidth: "600px",
//         marginLeft: "auto",
//         marginRight: "auto",
//         backgroundColor: "white",
//         transform: "translate(0, 50%)",
//         zIndex: 2,
//     };

//     const fullScreenBackgroundStyle = {
//         position: 'fixed',
//         right: 0,
//         bottom: 0,
//         minWidth: '100%',
//         minHeight: '100%',
//         zIndex: -1
//     };

//     return (
//         <div>
//             <video style={fullScreenBackgroundStyle} autoPlay loop muted>
//                 <source src={BackgroundVideo} type="video/mp4" />
//                 Your browser does not support the video tag.
//             </video>
//             <div style={containerStyle}> {/* Container */}
//                 <div className={"startContainer"}>
//                     <img src={SwoleMates} alt="SwoleMates Logo" style={{ width: "450px", height: "auto" }} />
//                 </div>
//                 <div>Sweat Together, Swole Together!</div>
//                 <br />
//                 <div className={"buttonContainer"}>
//                     <input className={"inputButton"} type="button" onClick={onButtonClick} value={loggedIn ? "Log Out" : "Log In"} />
//                     {loggedIn ? <div>Your username is {username}</div> : <div />}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Start;
