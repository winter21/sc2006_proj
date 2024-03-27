import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SwoleMates from "../assets/SwoleMates.png";

const Onboarding2 = (props) => {

    const navigate = useNavigate();

    const onButtonClick = () => {
        navigate("/onboardingPg3");
    };

    return (
        <div>
            <div className={"onboardingContainer"}>
                <div>Host or Join workout sessions in your area</div>
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

export default Onboarding2;