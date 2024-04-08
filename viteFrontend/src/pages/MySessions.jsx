import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Navbar from '../components/Navbar';
import {
  Typography,
  CardContent,
  Card,
  List,
  ListItem,
} from "@mui/material";

const MySessions = () => {
  const [hostedSessions, setHostedSessions] = useState([]);
  const [joinedSessions, setJoinedSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessions = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.token) {
        console.error("No user token found");
        setIsLoading(false);
        return;
      }
  
      try {
        const verifyRes = await axios.post("http://localhost:3000/account/check-jwt", {
          token: user.token,
        });
  
        // Fetching hosted sessions, filtering out cancelled and "off" ones
        const hostedSessionsRes = await axios.get(`http://localhost:3000/workoutSession/host/${verifyRes.data.userId}`);
        const hostedSessionsFiltered = hostedSessionsRes.data.filter(session => !session.cancelled && session.on);
        setHostedSessions(hostedSessionsFiltered);
  
        // Fetching joined sessions, filtering out cancelled and "off" ones
        const joinedSessionsRes = await axios.get(`http://localhost:3000/workoutSession/user/${verifyRes.data.userId}`);
        const joinedSessionsFiltered = joinedSessionsRes.data.filter(session => !session.cancelled && session.on);
        setJoinedSessions(joinedSessionsFiltered);
      } catch (error) {
        console.error("Failed to fetch sessions:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchSessions();
  }, []);
  
  
  const renderSessionsList = (sessions) => (
    <>
      {sessions.length > 0 ? (
        <List style={{ display: 'flex', flexDirection: 'row', padding: '20px', overflowX: 'scroll' }}>
          {sessions.map(session => (
            <ListItem
              key={session._id}
              style={{
                display: "inline-block",
                width: "auto",
                marginRight: "20px",
              }}
              onClick={() => handleCardClick(session._id)}
            >
              <Card
                elevation={6}
                sx={{
                  minWidth: 275,
                  maxWidth: 345,
                  borderRadius: "20px",
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)",
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
            </ListItem>
          ))}
        </List>
      ) : (
        <p>No sessions found.</p>
      )}
    </>
  );

  const handleCardClick = (sessionId) => {
    navigate(`/SessionDetails/${sessionId}`);
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 70px)' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px' }}>
          <h2 style={{ margin: 0 }}>Hosted Sessions</h2>
          {renderSessionsList(hostedSessions)}
        </div>
        
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px' }}>
          <h2 style={{ margin: 0 }}>Joined Sessions</h2>
          {renderSessionsList(joinedSessions)}
        </div>
      </div>
    </div>
  );
};

export default MySessions;


// import React, { useEffect, useState } from 'react';
// import { useNavigate } from "react-router-dom"; 
// import axios from 'axios';
// import Navbar from '../components/Navbar';
// import {
//   Typography,
//   CardContent,
//   Card,
//   List,
//   ListItem,
// } from "@mui/material";

// const MySessions = () => {
//   const [hostedSessions, setHostedSessions] = useState([]);
//   const [joinedSessions, setJoinedSessions] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchSessions = async () => {
//       const user = JSON.parse(localStorage.getItem("user"));
//       if (!user || !user.token) {
//         console.error("No user token found");
//         setIsLoading(false);
//         return;
//       }

//       try {
//         const verifyRes = await axios.post("http://localhost:3000/account/check-jwt", {
//           token: user.token,
//         });
//         console.log("User ID:", verifyRes.data.userId); // Debugging line

//         // Fetching hosted sessions
//         const hostedSessionsRes = await axios.get(`http://localhost:3000/workoutSession/host/${verifyRes.data.userId}`);
//         console.log("Hosted Sessions:", hostedSessionsRes.data); // Debugging line
//         setHostedSessions(hostedSessionsRes.data);

//         // Fetching joined sessions
//         const joinedSessionsRes = await axios.get(`http://localhost:3000/workoutSession/user/${verifyRes.data.userId}`);
//         console.log("Joined Sessions:", joinedSessionsRes.data); // Debugging line
//         setJoinedSessions(joinedSessionsRes.data);
//       } catch (error) {
//         console.error("Failed to fetch sessions:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchSessions();
//   }, []);
  
//   const scrollContainerStyle = {
//     display: "flex",
//     overflowX: "auto",
//     // Hiding the scrollbar
//     scrollbarWidth: "none", // For Firefox
//     "&::-webkit-scrollbar": {
//       display: "none", // For Chrome, Safari, and Opera
//     },
//     "-ms-overflow-style": "none", // For Internet Explorer and Edge
//   };
  

//   const renderSessionsList = (sessions) => (
//     <>
//       {sessions.length > 0 ? (
//         <List style={{ display: 'flex', flexDirection: 'row', padding: '20px', overflowX: 'scroll' }}>
//           {sessions.map(session => (
//             <ListItem
//               key={session._id}
//               style={{
//                 display: "inline-block",
//                 width: "auto",
//                 marginRight: "20px",
//               }}
//               onClick={() => handleCardClick(session._id)}
//             >
//               <Card
//                 elevation={6}
//                 sx={{
//                   minWidth: 275,
//                   maxWidth: 345,
//                   borderRadius: "20px",
//                   boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)",
//                 }}
//               >
//                 <CardContent>
//                   <img
//                     src={`http://localhost:3000/${session.workoutPicture}`}
//                     alt={session.name}
//                     style={{
//                       width: "100%",
//                       height: "auto",
//                       marginBottom: "10px",
//                       borderRadius: "8%",
//                     }}
//                   />
//                   <Typography
//                     variant="h5"
//                     component="h2"
//                     style={{ fontWeight: "bold" }}
//                   >
//                     {session.name}
//                   </Typography>
//                   <Typography variant="body1">
//                     Location: {session.address}
//                   </Typography>
//                   <Typography variant="body1">
//                     Date: {session.date}
//                   </Typography>
//                   <Typography variant="body1">
//                     Slots: {session.slots} slot(s) left
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </ListItem>
//           ))}
//         </List>
//       ) : (
//         <p>No sessions found.</p>
//       )}
//     </>
//   );

//   const handleCardClick = (sessionId) => {
//     navigate(`/SessionDetails/${sessionId}`);
//   };

//   return (
//     <div>
//       <Navbar />
//       {/* Container for both sections */}
//       <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 70px)' }}> {/* Adjusted for navbar height */}
        
//         {/* Hosted Sessions */}
//         <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px' }}>
//           <h2 style={{ margin: 0 }}>Hosted Sessions</h2>
//           {renderSessionsList(hostedSessions)}
//         </div>
        
//         {/* Joined Sessions */}
//         <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px' }}>
//           <h2 style={{ margin: 0 }}>Joined Sessions</h2>
//           {renderSessionsList(joinedSessions)}
//         </div>
        
//       </div>
//     </div>
//   );
  

        
// };

// export default MySessions;


  




// import React from 'react';
// import Navbar from '../components/Navbar';

// const MySessions = () => {
//   return (
//     <div>
//       <Navbar />
//       <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px', marginBottom: '30px' }}>
//         <p>hello</p>
//         {/* Display hosted workout session here. */}
//       </div>
//     </div>
//   );
// };

// export default MySessions;
