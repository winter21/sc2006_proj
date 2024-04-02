import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SwoleMates from "../assets/SwoleMates.png";
import UluPandan from "../assets/UluPandan.png";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Box, Typography, CardContent, Card, Grid } from "@mui/material"; // Import MUI components

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
      <Grid container spacing={3}> {/* Container with grid layout */}
        {sessions.map((session) => (
          <Grid item xs={4} key={session.id}> {/* Each card component takes 4 grid units */}
            <Card elevation={3} className="customCard">
              <CardContent>
              <img src={UluPandan} style={{ width: '250px', height: 'auto', marginBottom: '10px', borderRadius: '8%' }} />                <Typography variant="h5" component="h2">{session.name}</Typography>
                <Typography variant="body1">Location: {session.address}</Typography>
                <Typography variant="body1">Date: {session.date}</Typography>
                <Typography variant="body1">Start Time: {session.startTime}</Typography>
                <Typography variant="body1">Duration: {session.duration} hour(s)</Typography>
                <Typography variant="body1">Interest: {session.interest}</Typography>
                <Typography variant="body1">Slots: {session.slots} slot(s) left</Typography>
                <Typography variant="body1">Host: {session.host}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
