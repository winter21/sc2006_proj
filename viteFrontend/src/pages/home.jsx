import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SwoleMates from "../assets/SwoleMates.png";
import UluPandan from "../assets/UluPandan.png";
import Navbar from "../components/Navbar";
import axios from "axios";
import { TextField, Box, Typography, CardContent, Card, Grid, List, ListItem } from "@mui/material"; // Import MUI components
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

  const scrollContainerStyle = {
    display: 'flex',
    overflowX: 'auto',
    '&::-webkit-scrollbar': {
      height: '8px', // You can adjust the height of the scrollbar here
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#888',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#555',
    },
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

      <Box sx={scrollContainerStyle}>
        <List style={{ display: 'flex' }}>
          {filteredSessions.map((session) => (
            <ListItem key={session.id} style={{ display: 'inline-block', width: 'auto', marginRight: '20px'}}>
              <Card elevation={6} className="customCard" sx={{ minWidth: 275, maxWidth: 345, borderRadius: '20px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)' }}>
                <CardContent>
                  <img src={UluPandan} alt="Ulu Pandan" style={{ width: '100%', height: 'auto', marginBottom: '10px', borderRadius: '8%' }} />
                  <Typography variant="h5" component="h2" style={{ fontWeight: 'bold' }}>{session.name}</Typography>
                  <Typography variant="body1">Location: {session.address}</Typography>
                  <Typography variant="body1">Date: {session.date}</Typography>
                  <Typography variant="body1">Slots: {session.slots} slot(s) left</Typography>
                </CardContent>
              </Card>
            </ListItem>
          ))}
        </List>
      </Box>

    </div>
  );
};

export default Home;
