import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SwoleMates from "../assets/SwoleMates.png";
import Navbar from "../components/Navbar";
import axios from "axios";

const Home = (props) => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/workoutSession/");
        setSessions(response.data);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };
    fetchSessions();
  }, []);

  return (
    <div>
      <Navbar />
      <p>HOME</p>
      {/* Render sessions here */}
      <div>
        {sessions.map((session) => (
          <div key={session.id}>
            <h1>{session.name}</h1>
            {/* Render other session details as needed */}
            <h3>{session.address}</h3>
            <h3>{session.date}</h3>
            <h3>{session.startTime}</h3>
            <h3>{session.duration} hour(s)</h3>
            <h3>{session.interest}</h3>
            <h3>{session.slots} slots left</h3>
            <h3>{session.host}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
