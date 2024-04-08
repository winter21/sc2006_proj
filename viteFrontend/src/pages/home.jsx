import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import the necessary hooks
import UluPandan from "../assets/UluPandan.png";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Typography, CardContent, Card, Grid, ListItem, Chip, Box } from "@mui/material"; // Import MUI components

const Home = (props) => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [sessions, setSessions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInterests, setSelectedInterests] = useState([]);
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

  const handleInterestClick = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(prevInterests => prevInterests.filter(item => item !== interest));
    } else {
      setSelectedInterests(prevInterests => [...prevInterests, interest]);
    }
  };

  const filteredSessions = sessions.filter(session =>
    session.on &&
    session.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedInterests.length === 0 || selectedInterests.every(interest => session.interest.includes(interest)))
  );
  

  const handleCardClick = (sessionId) => {
    navigate(`/SessionDetails/${sessionId}`); // Navigate to SessionDetails page with session id
  };

  const interestColors = {
    "Running": "#FF7043",
    "HIIT": "#AB47BC",
    "Yoga": "#5C6BC0",
    "Pilates": "#42A5F5",
    "Dance": "#26A69A",
    "Hiking": "#9CCC65",
    "Boxing": "#D4E157",
    "Cycling": "#EF5350",
    "Rowing": "#EC407A",
    "Weightlifting": "#FFA726",
    "Swimming": "#8D6E63",
    "CrossFit": "#78909C",
  };

  const interests = [...new Set(sessions.flatMap(session => session.interest))]; // Extract unique interests

  return (
    <div>
      <Navbar />
      <div>
        <div className="inputContainer" id="searchBox" sx={{ marginBottom: '20px' }}>
          <input id="searchBar"
            placeholder="Search for sessions"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            fullWidth
          />
        </div>

        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          {interests.map(interest => (
            <Chip
              key={interest}
              label={interest}
              onClick={() => handleInterestClick(interest)}
              variant={selectedInterests.includes(interest) ? "outlined" : "default"}
              style={{
                margin: '0 5px',
                cursor: 'pointer',
                border: `1.5px solid ${interestColors[interest] ? interestColors[interest] : '#e0e0e0'}`,
                backgroundColor: selectedInterests.includes(interest) ? 'transparent' : (interestColors[interest] || 'default'),
                color: selectedInterests.includes(interest) ? interestColors[interest] : 'white',
              }}
            />
          ))}
        </Box>

        <Grid container spacing={3}>
          {filteredSessions.map((session) => (
            <Grid item xs={2.7} key={session.id} style={{ marginLeft: '20px' }}>
              <ListItem button onClick={() => handleCardClick(session._id)}>
                <Card
                  elevation={5}
                  className="customCard"
                  sx={{
                    minWidth: 275,
                    maxWidth: 300,
                    borderRadius: '20px',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'scale(1.05)', // Scale up by 5% on hover
                    },
                  }}
                >
                  <CardContent>
                  <img
                    src={`http://localhost:3000/${session.workoutPicture}`}
                    alt="No Need"
                    style={{
                      width: '250px',
                      height: '180px',
                      marginBottom: '10px',
                      borderRadius: '8%',
                      objectFit: 'cover', // Ensure image covers container while maintaining aspect ratio
                    }}
                  />
                    <Typography variant="h5" component="h2" style={{ fontWeight: 'bold' }}>{session.name}</Typography>
                    <Typography variant="body1">Date: {session.date.slice(0, 10)}</Typography>
                    <Typography variant="body1">Start Time: {session.date.slice(11, 16)}</Typography>
                    <Typography variant="body1">
                      Slots: {session.slots - session.participants.length}/{session.slots} slot(s) available
                    </Typography>
                  </CardContent>
                </Card>
              </ListItem>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Home;
