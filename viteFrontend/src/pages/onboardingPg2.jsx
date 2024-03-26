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
            <p>test2</p>
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