import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SwoleMates from "../assets/SwoleMates.png";

const Onboarding3 = (props) => {

    const navigate = useNavigate();

    const onButtonClick = () => {
        navigate("/home");
    };

    return (
        <div>
            <p>test3</p>
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

export default Onboarding3;