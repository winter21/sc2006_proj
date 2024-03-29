// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import SwoleMates from "../assets/SwoleMates.png";
// import OB2 from "../assets/OB2.png";

// const Onboarding2 = (props) => {
//     const navigate = useNavigate();

//     const onButtonClick = () => {
//         navigate("/onboardingPg3");
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
//     };

//     return (
// <div>
// <div style={containerStyle}>             
//     <div className={"onboardingContainer"}>
//         <div>
//         <img src={OB2} alt="workoutsession" style={{ maxWidth: "100%", height: "auto", marginRight: "-40px", marginBottom:"5vh", marginBottom:"5vh"}}/>
//             <span style={{ color: "red", display: "contents" }}>Host</span> or 
//             <span style={{ color: "red", display: "contents" }}> join</span> workout sessions in your area
//         </div>
//     </div>
//     <br />
    
//     <div className={"inputContainer"}>
//         <input
//             className={"inputButton"}
//             type="button"
//             onClick={onButtonClick}
//             value={"Next"}
//         />
//     </div>
// </div>
// </div>

//     );

// }

// export default Onboarding2;

import React from "react";
import { useNavigate } from "react-router-dom";
import SwoleMates from "../assets/SwoleMates.png";
import OB2 from "../assets/OB2.png";
import BackgroundImage from "../assets/RedBg.jpg"; 

const Onboarding2 = (props) => {
    const navigate = useNavigate();

    const onButtonClick = () => {
        navigate("/onboardingPg3");
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
    };

    const fullScreenBackgroundStyle = {
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${BackgroundImage})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        position: 'fixed', 
        top: 0,
        left: 0,
        zIndex: -1 
    };

    return (
        <div> {/* Wrap everything in a single div */}
            <div style={fullScreenBackgroundStyle} /> {/* Background image div */}
            <div style={containerStyle}> {/* Content container div */}
                <div className={"onboardingContainer"}>
                    <div>
                        <img src={OB2} alt="workout session" style={{ maxWidth: "100%", height: "auto", marginRight: "-40px", marginBottom:"5vh"}}/>
                        <span style={{ color: "red", display: "contents" }}>Host</span> or 
                        <span style={{ color: "red", display: "contents" }}> join</span> workout sessions in your area
                    </div>
                </div>
                <br />
                <div className={"inputContainer"}>
                    <input
                        className={"inputButton"}
                        type="button"
                        onClick={onButtonClick}
                        value={"Next"}
                    />
                </div>
            </div>
        </div>
    );
}

export default Onboarding2;
