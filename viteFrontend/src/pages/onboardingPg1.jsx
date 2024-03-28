import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SwoleMates from "../assets/SwoleMates.png";
import OB1 from "../assets/OB1.png";

const Onboarding1 = (props) => {

    const navigate = useNavigate();

    const onButtonClick = () => {
        navigate("/onboardingPg2");
    };

    return (
        <div>          
            <div className={"onboardingContainer"}>
                <img src={OB1} alt="Nearby Gym" style={{marginRight:'-40px'}}/>
                Discover <span style={{ color: "red", display: "contents" }}>nearby gyms</span> and how to get there
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
    );

}

export default Onboarding1;