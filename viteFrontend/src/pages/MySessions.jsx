// import React, { useState } from 'react';
// import Navbar from '../components/Navbar';
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { TextField, Box, Typography, CardContent, Card, Grid, List, ListItem } from "@mui/material";

// const MySessions = () => {
//   const [isHosted, setIsHosted] = useState(true);

//   const toggleSessions = () => setIsHosted(!isHosted);

//   return (
//     <div>
//       <Navbar />
//       <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px', marginBottom: '30px' }}>
//         <div
//           onClick={toggleSessions}
//           style={{
//             display: 'flex',
//             justifyContent: isHosted ? 'flex-start' : 'flex-end',
//             alignItems: 'center',
//             width: '200px',
//             height: '40px',
//             padding: '2px',
//             backgroundColor: '#f0f0f0',
//             border: '2px solid #dcdcdc',
//             borderRadius: '20px',
//             cursor: 'pointer',
//             position: 'relative',
//           }}
//         >
//           {/* New Text Element for "Hosted" */}
//           {isHosted && (
//             <div style={{
//               position: 'absolute',
//               left: '63%', // Position to the right of the smaller oval
//               top: '50%',
//               transform: 'translateY(-50%)',
//               color: '#000',
//             }}>
//               Joined
//             </div>
//           )}

//           {/* Toggle Indicator */}
//           <div style={{
//             width: '50%',
//             height: '100%',
//             backgroundColor: isHosted ? '#FF0000' : '#FF0000',
//             borderRadius: '20px',
//             textAlign: 'center',
//             lineHeight: '36px',
//             color: 'white',
//           }}>
//             {isHosted ? 'Hosted' : 'Joined'}
//           </div>

//           {/* New Text Element for "Joined" */}
//           {!isHosted && (
//             <div style={{
//               position: 'absolute',
//               right: '63%', // Position to the left of the smaller oval
//               top: '50%',
//               transform: 'translateY(-50%)',
//               color: '#000',
//             }}>
//               Hosted
//             </div>
//           )}
//         </div>
//       </div>
//       {isHosted ? (
//         <div>
//           <p>Showing <span style={{ fontSize: '120px', fontWeight: 'bold' }}>Hosted</span> Sessions...</p>
//         </div>
//       ) : (
//         <div>
//           <p>Showing <span style={{ fontSize: '120px', fontWeight: 'bold' }}>Joined</span> Sessions...</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MySessions;



import React, { useState, useEffect } from 'react'; 
import Navbar from '../components/Navbar';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Box, Typography, CardContent, Card, Grid, List, ListItem } from "@mui/material";
import UluPandan from "../assets/Zenitsu.png";


const MySessions = () => {
  const [isHosted, setIsHosted] = useState(true);

  const toggleSessions = () => setIsHosted(!isHosted);
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
    // Hiding the scrollbar
    scrollbarWidth: 'none', // For Firefox
    '&::-webkit-scrollbar': {
      display: 'none', // For Chrome, Safari, and Opera
    },
    '-ms-overflow-style': 'none', // For Internet Explorer and Edge
  };

  const filteredSessions = sessions.filter(session =>
    session.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px', marginBottom: '30px' }}>
        <div
          onClick={toggleSessions}
          style={{
            display: 'flex',
            justifyContent: isHosted ? 'flex-start' : 'flex-end',
            alignItems: 'center',
            width: '200px',
            height: '40px',
            padding: '2px',
            backgroundColor: '#f0f0f0',
            border: '2px solid #dcdcdc',
            borderRadius: '20px',
            cursor: 'pointer',
            position: 'relative',
          }}
        >
          {/* New Text Element for "Hosted" */}
          {isHosted && (
            <div style={{
              position: 'absolute',
              left: '63%', // Position to the right of the smaller oval
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#000',
            }}>
              Joined
            </div>
          )}

          {/* Toggle Indicator */}
          <div style={{
            width: '50%',
            height: '100%',
            backgroundColor: isHosted ? '#FF0000' : '#FF0000',
            borderRadius: '20px',
            textAlign: 'center',
            lineHeight: '36px',
            color: 'white',
          }}>
            {isHosted ? 'Hosted' : 'Joined'}
          </div>

          {/* New Text Element for "Joined" */}
          {!isHosted && (
            <div style={{
              position: 'absolute',
              right: '63%', // Position to the left of the smaller oval
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#000',
            }}>
              Hosted
            </div>
          )}
        </div>
      </div>
      {isHosted ? (
        <div>
          <p>Showing <span style={{ fontSize: '120px', fontWeight: 'bold' }}>Hosted</span> Sessions...</p>
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
      ) : (
        <div>
          <p>Showing <span style={{ fontSize: '120px', fontWeight: 'bold' }}>Joined</span> Sessions...</p>
        </div>
      )}
    </div>
  );
};

export default MySessions;
