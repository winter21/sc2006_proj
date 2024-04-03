import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SwoleMates from "../assets/SwoleMates.png";
import UluPandan from "../assets/UluPandan.png";
import Navbar from "../components/Navbar";
import axios from "axios";
import { TextField, Box, Typography, CardContent, Card, Grid } from "@mui/material"; // Import MUI components
import SearchIcon from "@mui/icons-material/Search";

const Home = (props) => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

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

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const filteredSessions = sessions.filter(session =>
    session.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <Box className="searchBox" sx={{ marginBottom: '20px' }}>
        <TextField
          label={isInputFocused ? "" : "Search for sessions"}
          placeholder="Search for sessions"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          fullWidth
          InputProps={{
            endAdornment: <SearchIcon />,
          }}
        />
      </Box>
      <Grid container spacing={3}>
        {filteredSessions.map((session) => (
          <Grid item xs={4} key={session.id}>
            <Card elevation={3} className="customCard">
              <CardContent>
                <img src={UluPandan} alt="Ulu Pandan" style={{ width: '250px', height: 'auto', marginBottom: '10px', borderRadius: '8%' }} />
                <Typography variant="h5" component="h2" style={{ fontWeight: 'bold' }}>{session.name}</Typography>
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
