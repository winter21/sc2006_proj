import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SwoleMates from "../assets/SwoleMates.png";
import Navbar from "../components/Navbar";

const Home = (props) => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <p>HOME</p>
    </div>
  );
};

export default Home;
