import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BackgroundImage from "../assets/RedBg.jpg";

const SessionDetails = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState({});
  const [userId, setUserId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [listLoaded, setListLoaded] = useState(false);
  const [hostLoaded, setHostLoaded] = useState(false);
  const [numParticipants, setNumParticipants] = useState("");
  const [participantList, setParticipantList] = useState([]);
  const [host, setHost] = useState("");
  const [hostDetails, setHostDetails] = useState("");
  const [userList, setUserList] = useState([]);

  const params = useParams();
  const { id } = params;

  const fetchSession = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/workoutSession/" + id
      );
      setSession(response.data);
    } catch (error) {
      console.error("Error fetching session:", error);
    }
  };

  useEffect(() => {
    userCheck();
    fetchSession();
  }, []);

  const fetchUserList = async () => {
    try {
      // const response = await axios.get(("http://localhost:3000/user/userList/"), {
      //   userList : userList
      // })
      const response = await axios.get(
        "http://localhost:3000/user/userList/" + userList
      );
      console.log(response.data);
      setParticipantList(response.data);
    } catch (error) {
      console.error("Error fetching session:", error);
    }
  };

  const fetchHost = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user/" + host, {
        userId: host,
      });
      setHostDetails(response.data);
    } catch (error) {
      console.error("Error fetching session:", error);
    }
  };

  useEffect(() => {
    if (session && session !== undefined) {
      renderActionButtons();
      setDate(String(session.date).split("T")[0]);
      const dateTime = new Date(session.date);
      const hours = String(dateTime.getUTCHours()).padStart(2, "0");
      const minutes = String(dateTime.getUTCMinutes()).padStart(2, "0");
      setTime(`${hours}:${minutes}`);
      if (session.host !== undefined) {
        setHost(session.host);
        setHostLoaded(true);
      }
      if (session.participants === undefined) {
        setNumParticipants(0);
      } else if (session.participants.length !== 0) {
        setNumParticipants(session.participants.length);
        setUserList([...userList, ...session.participants]);
        setListLoaded(true);
      }
    }
  }, [session]);

  useEffect(() => {
    if (listLoaded === true) {
      console.log(userList);
      fetchUserList();
    }
  }, [listLoaded]);

  useEffect(() => {
    if (hostLoaded === true) {
      console.log(session.host);
      fetchHost();
    }
  }, [hostLoaded]);

  const handleEditButtonClick = () => {
    navigate("/editsession/" + id);
  };

  const handleCancelButtonClick = async () => {
    try {
      const res = await axios.put(
        "http://localhost:3000/workoutSession/cancel/" + id
      );
      console.log(res);
      alert("You have successfully cancelled the workout session");
      navigate(-1);
    } catch (error) {
      console.log(error.stack);
    }
  };

  const handleLeaveButtonClick = async () => {
    try {
      const res = await axios.put(
        "http://localhost:3000/workoutSession/leave/" + id,
        {
          userId: userId,
        }
      );
      console.log(res);
      alert("You have successfully left the workout session");
      navigate(0);
    } catch (error) {
      console.log(error.stack);
    }
  };

  const handleJoinButtonClick = async () => {
    try {
      const res = await axios.put(
        "http://localhost:3000/workoutSession/join/" + id,
        {
          userId: userId,
        }
      );
      console.log(res);
      alert("You have successfully joined the workout session");
      navigate(0);
    } catch (error) {
      console.log(error.stack);
    }
  };

  const userCheck = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("user")).token;
      const decodedToken = await axios.post(
        "http://localhost:3000/account/decode-jwt",
        {
          token: token,
        }
      );
      setUserId(decodedToken.data.userId);
    } catch (error) {
      console.log(error.stack);
    }
  };

  const renderActionButtons = () => {
    try {
      if (session.host === userId) {
        return (
          <>
            <div className={"inputContainer"}>
              <input
                className={"inputButton"}
                type="button"
                onClick={handleEditButtonClick}
                value={"Edit Session"}
              />
            </div>
            <div className={"inputContainer"}>
              <input
                className={"inputButton"}
                type="button"
                onClick={handleCancelButtonClick}
                value={"Cancel Session"}
              />
            </div>
          </>
        );
      } else if (
        session.participants &&
        session.participants.includes(userId)
      ) {
        return (
          <div className={"inputContainer"}>
            <input
              className={"inputButton"}
              type="button"
              onClick={handleLeaveButtonClick}
              value={"Leave Session"}
            />
          </div>
        );
      } else if (numParticipants === session.slots) {
        return (
          <div style={{ color: "grey", textAlign: "center" }}>
            <h2 style={{ fontSize: "24px" }}>Session is Full</h2>
          </div>
        );
      } else {
        return (
          <div className={"inputContainer"}>
            <input
              className={"inputButton"}
              type="button"
              onClick={handleJoinButtonClick}
              value={"Join Session"}
            />
          </div>
        );
      }
    } catch (error) {
      console.error("Error rendering action buttons:", error);
      return null;
    }
  };

  const containerStyle = {
    borderRadius: "20px",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.5)",
    padding: "40px",
    margin: "20px",
    marginTop: "15vh",
    maxWidth: "600px",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "white",
  };

  const fullScreenBackgroundStyle = {
    width: "100vw",
    height: "100vh",
    backgroundImage: `url(${BackgroundImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: -1,
  };

  const interestColors = {
    Running: "#FF7043",
    HIIT: "#AB47BC",
    Yoga: "#5C6BC0",
    Pilates: "#42A5F5",
    Dance: "#26A69A",
    Hiking: "#9CCC65",
    Boxing: "#D4E157",
    Cycling: "#EF5350",
    Rowing: "#EC407A",
    Weightlifting: "#FFA726",
    Swimming: "#8D6E63",
    CrossFit: "#78909C",
  };

  return (
    <div>
      <Navbar />
      <div style={fullScreenBackgroundStyle} />
      <div style={containerStyle}>
        <img
          src={`http://localhost:3000/${session.workoutPicture}`}
          alt="No Need"
          style={{
            width: "100%",
            height: "auto",
            marginBottom: "10px",
            borderRadius: "4%",
          }}
        />
        <div className={"headerContainer"}>
          <h2>{session.name}</h2>
        </div>
        <div className={"subDetailsContainer"}>
          <p>Hosted by: {hostDetails.name}</p>
          <p>Date: {date}</p>
          <p>Start Time: {time} (24hr)</p>
          <p>Duration: {session.duration} hour(s)</p>
          <p>Location: {session.address}</p>
          <p className="interestsLabel">Session Type:</p>
          <div className="interestsContainer" style={{ fontSize: 15 }}>
            {session.interest &&
              session.interest.map((interest, index) => (
                <div
                  key={index}
                  className="interestItem"
                  style={{
                    backgroundColor: interestColors[interest],
                    pointerEvents: "none",
                  }}
                >
                  {interest}
                </div>
              ))}
          </div>{" "}
          <br />
          <p>
            Number of Participants: {numParticipants}/{session.slots}
          </p>
          <p>List of Participants: </p>
          <div
            style={{
              display: 'flex', 
              flexWrap: 'wrap', // Allow flex items to wrap to the next line
              gap: '10px' // Adjust the gap between items as needed
            }}>
              {participantList.map((participant) => (
                <div className="interestItem"
                  key={participant.id}
                  style={{ 
                    backgroundColor: '#f2839f',
                    borderRadius: '30px',
                    fontSize: 15,
                    pointerEvents: "none"
                  }} 
              >
                {participant.name}
              </div>
            ))}
          </div>
        </div>
        <br />
        {renderActionButtons()}
      </div>
    </div>
  );
};

export default SessionDetails;
