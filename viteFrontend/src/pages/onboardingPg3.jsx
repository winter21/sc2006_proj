// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import SwoleMates from "../assets/SwoleMates.png";
// import OB3 from "../assets/OB3.png";
// import BackgroundImage from "../assets/RedBg.jpg";

// const Onboarding3 = (props) => {

//     const navigate = useNavigate();

//     const onButtonClick = () => {
//         navigate("/home");
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
//         zIndex: -1 // Ensure the background is behind other content
//     };

//     return (
// <div>          
//     <div className={"onboardingContainer"}>
//         <div>
//         <img src={OB3} alt="workout session" style={{ maxWidth: "100%", height: "auto", marginRight: "-40px", marginBottom:"5vh"}}/>
//             <span style={{ color: "red", display: "contents" }}>Connect</span> with like-minded individuals
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

//     );

// }

// export default Onboarding3;


import React from "react";
import { useNavigate } from "react-router-dom";
import OB3 from "../assets/OB3.png";
import BackgroundImage from "../assets/RedBg.jpg"; 

const Onboarding3 = (props) => {
    const navigate = useNavigate();

    const onButtonClick = () => {
        navigate("/home"); 
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

    const imageContainerStyle = {
        display: "flex",
        justifyContent: "center", 
        alignItems: "center", 
        height: "100%", 
    };

    return (
        <div> {/* This div wraps everything, including the background */}
            <div style={fullScreenBackgroundStyle} /> {/* Background image */}
            <div style={containerStyle}> {/* Content container */}
                <div className={"onboardingContainer"}>
                    <div>
                        <div style={imageContainerStyle}> {/* This div will center the image */}
                            <img src={OB3} alt="workout session" style={{ maxWidth: "50%", height: "auto" }}/>
                        </div>
                        <span style={{ color: "red", display: "contents" }}>Connect</span> with like-minded individuals
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

export default Onboarding3;
