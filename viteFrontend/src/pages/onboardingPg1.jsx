import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SwoleMates from "../assets/SwoleMates.png";

const Onboarding1 = (props) => {

    const navigate = useNavigate();

    const onButtonClick = () => {
        navigate("/onboardingPg2");
    };

    return (
        <div>
            <div className={"onboardingContainer"}>
                <div>Discover nearby gyms and how to get there</div>
            </div>
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