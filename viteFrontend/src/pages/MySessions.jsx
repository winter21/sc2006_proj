// the one with toggle button
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  CardContent,
  Card,
  List,
  ListItem,
} from "@mui/material";
import RedBg from "../assets/RedBg.jpg";
import Masonry from 'react-masonry-css';



const MySessions = () => {
  const [isHosted, setIsHosted] = useState(true);
  const toggleSessions = () => setIsHosted(!isHosted);
  const [hostedSessions, setHostedSessions] = useState([]);
  const [joinedSessions, setJoinedSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };


  //masonry
  const myMasonryGridStyle = {
    display: 'flex',
    width: 'auto',
    justifyContent: 'center',
    marginLeft: '-15px',
  };
  
  //masonry
  const masonryGridItemStyle = {
    marginBottom: '20px',
    marginLeft: '20px',
  };
  
 
  
useEffect(() => {
  async function fetchHostedSessions() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.token) {
      console.error("No user token found");
      return;
    }

    try {
      const verifyRes = await axios.post("http://localhost:3000/account/check-jwt", {
        token: user.token,
      });
      const hostedSessionsRes = await axios.get(`http://localhost:3000/workoutSession/host/${verifyRes.data.userId}`);
      const hostedSessionsFiltered = hostedSessionsRes.data.filter(session => !session.cancelled && session.on);
      setHostedSessions(hostedSessionsFiltered);
    } catch (error) {
      console.error("Failed to fetch hosted sessions:", error.response ? error.response.data : error);
    }
  }

  fetchHostedSessions();
}, []); 


useEffect(() => {
  async function fetchJoinedSessions() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.token) {
      console.error("No user token found");
      return;
    }

    try {
      const verifyRes = await axios.post("http://localhost:3000/account/check-jwt", {
        token: user.token,
      });
      const joinedSessionsRes = await axios.get(`http://localhost:3000/workoutSession/user/${verifyRes.data.userId}`);
      const joinedSessionsFiltered = joinedSessionsRes.data.filter(session => !session.cancelled && session.on);
      setJoinedSessions(joinedSessionsFiltered);
    } catch (error) {
      console.error("Failed to fetch joined sessions:", error.response ? error.response.data : error);
    }
  }

  fetchJoinedSessions();
}, []); 

  //masonry
  const renderSessionsList = (sessions) => (
    <>
      {sessions.length > 0 ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}> 
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
            style={myMasonryGridStyle}
          >
            {sessions.map((session) => (
              <div
                key={session._id}
                onClick={() => handleCardClick(session._id)}
                style={{ ...masonryGridItemStyle, cursor: 'pointer'}} 
              >
                <Card
                  elevation={6}
                  sx={{
                    minWidth: 275,
                    maxWidth: 345,
                    borderRadius: "20px",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)",
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <CardContent>
                    <img
                      src={`http://localhost:3000/${session.workoutPicture}`}
                      alt={session.name}
                      style={{
                        width: "100%",
                        height: "auto",
                        marginBottom: "10px",
                        borderRadius: "8%",
                      }}
                    />
                    <Typography variant="h5" component="h2" style={{ fontWeight: "bold" }}>
                      {session.name}
                    </Typography>
                    <Typography variant="body1">
                      Date: {session.date.slice(0, 10)}
                    </Typography>
                    <Typography variant="body1">
                      Start Time: {session.date.slice(11, 16)}
                    </Typography>
                    <Typography variant="body1">
                      Slots: {session.slots - session.participants.length}/{session.slots} slot(s) available
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            ))}
          </Masonry>
          </div>
      ) : (
        <p>No sessions found.</p>
      )}
    </>
  );
  

  const handleCardClick = (sessionId) => {
    navigate(`/SessionDetails/${sessionId}`);
  };


  return (
    <div 
    style={{
      minHeight: '100vh',
      
      backgroundImage: `url(${RedBg})`,
      backgroundSize: 'cover', backgroundPosition: 'center' 

    }}>
      <Navbar />
      
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "40px",
          marginBottom: "30px",
        }}
      >
        <div
          onClick={toggleSessions}
          style={{
            display: "flex",
            justifyContent: isHosted ? "flex-start" : "flex-end",
            alignItems: "center",
            width: "200px",
            height: "40px",
            padding: "3px",
            alignContent: 'center',
            backgroundColor: "#D00026",
            border: "2px solid #9a0707",
            borderRadius: "20px",
            cursor: "pointer",
            position: "relative",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.3)", 
          }}
        >
          {/* New Text Element for "Hosted" */}
          {isHosted && (
            <div
              style={{
                position: "absolute",
                left: "63%",
                top: "50%",
                transform: "translateY(-50%)",
                color: "white",
                fontWeight: 'bold',
                alignContent: 'center',
              }}
            >
              Joined
            </div>
          )}

          {/* Toggle Indicator */}
          <div
            style={{
              width: "50%",
              height: "100%",
              backgroundColor: isHosted ? "#FFFFFF" : "#FFFFFF",
              borderRadius: "20px",
              textAlign: "center",
              lineHeight: "36px",
              color: "red",
              fontWeight: 'bold',
              alignContent: 'center',
            }}
          >
            {isHosted ? "Hosted" : "Joined"}
          </div>

          {/* New Text Element for "Joined" */}
          {!isHosted && (
            <div
              style={{
                position: "absolute",
                right: "63%", 
                top: "50%",
                transform: "translateY(-50%)",
                color: "white",
                fontWeight: 'bold',
                alignContent: 'center',
              }}
            >
              Hosted
            </div>
          )}
        </div>
      </div>

      {isHosted ? (
        <div>
          <p style={{ textAlign:'center', color:'white', fontSize: "30px"}}>
            Showing{" "}
            <span style={{ fontSize: "40px", fontWeight: "bold" }}>
              Hosted
            </span>{" "}
            Sessions.
          </p>

          {hostedSessions.length > 0 ? (
            renderSessionsList(hostedSessions)
          ) : (
            <p>You have not hosted any sessions.</p>
          )}
          
        </div>
      ) : (
        <div>
          <p style={{ textAlign:'center', color:'white', fontSize: "30px"}}>
            Showing{" "}
            <span style={{ fontSize: "40px", fontWeight: "bold" }}>
              Joined
            </span>{" "}
            Sessions.
          </p>

          {joinedSessions.length > 0 ? (
            renderSessionsList(joinedSessions)
          ) : (
            <p>You have not joined any sessions.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MySessions;





