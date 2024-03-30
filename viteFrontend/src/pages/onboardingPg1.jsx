import React from "react";
import { useNavigate } from "react-router-dom";
import OB1 from "../assets/OB1.png";
import BackgroundImage from "../assets/RedBg.jpg";

const Onboarding1 = (props) => {
    const navigate = useNavigate();

    const onButtonClick = () => {
        navigate("/onboardingPg2");
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
        <div> {/* Wrap everything in a single parent div */}
            <div style={fullScreenBackgroundStyle} /> {/* Background image */}
            <div style={containerStyle}> {/* Container */}
                <div className={"onboardingContainer"}>
                    <img src={OB1} alt="Nearby Gym" style={{ maxWidth: "100%", height: "auto", marginRight: "-40px"}}/>
                    Discover <span style={{ color: "red", display: "inline" }}>nearby gyms</span> and how to get there
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

export default Onboarding1;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import SwoleMates from "../assets/SwoleMates.png";
// import OB1 from "../assets/OB1.png";

// const Onboarding1 = (props) => {

//     const navigate = useNavigate();

//     const onButtonClick = () => {
//         navigate("/onboardingPg2");
//     };

//     return (
//         <div>          
//             <div className={"onboardingContainer"}>
//                 <img src={OB1} alt="Nearby Gym" style={{marginRight:'-40px'}}/>
//                 Discover <span style={{ color: "red", display: "contents" }}>nearby gyms</span> and how to get there
//                 </div>
//             <br />
            
//             <div className={"inputContainer"}>
//                 <input
//                 className={"inputButton"}
//                 type="button"
//                 onClick={onButtonClick}
//                 value={"Next"}
//                 />
//             </div>
//         </div>
//     );

// }

// export default Onboarding1;
