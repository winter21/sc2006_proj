import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const SessionDetails = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState({});
  const [userId, setUserId] = useState(""); // Assuming you have userId stored somewhere

  const params = useParams();
  const { id } = params;

  const fetchSession = async () => {
    try {
      const response = await axios.get("http://localhost:3000/workoutSession/" + id);
      setSession(response.data);
    } catch (error) {
      console.error("Error fetching session:", error);
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  const handleEditButtonClick = () => {
    // Handle edit button click logic
  };

  const handleDeleteButtonClick = () => {
    // Handle delete button click logic
  };

  const handleLeaveButtonClick = () => {
    // Handle leave button click logic
  };

  const handleJoinButtonClick = () => {
    // Handle join button click logic
  };

  const renderActionButtons = () => {
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
              onClick={handleDeleteButtonClick}
              value={"Delete Session"}
            />
          </div>
        </>
      );
    } else if (session.participants && session.participants.includes(userId)) {
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
  };

  return (
    <div>
      <Navbar />
      <div className={"mainDetailsContainer"}>
        <div className={"headerContainer"}>
          <h2>{session.name}</h2>
        </div>
        <div className={"subDetailsContainer"}>
          <p>Hosted by: {session.host}</p>
          <p>Date: {session.date}</p>
          <p>Duration: {session.duration} hour(s)</p>
          <p>Location: {session.interest}</p>
          <p>Interests: {session.address}</p>
          <p>Available Slots Left: {session.slots}</p>
          <p>List of Participants: {session.participants}</p>
        </div>
        {renderActionButtons()}
      </div>
    </div>
  );
};

export default SessionDetails;
