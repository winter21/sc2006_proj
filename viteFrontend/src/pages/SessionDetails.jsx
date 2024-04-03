import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const SessionDetails = () => {
  
  const navigate = useNavigate();
  const [session, setSession] = useState([]);

  const params = useParams()
  const {id} = params
  const fetchSessions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/workoutSession/"+ id) 
        setSession(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

  useEffect(() => {
    
    fetchSessions();
  }, []);

  // const onButtonClick = () => {
  //   setUserError("");

  //   if ("" === session.host) {
  //       setUserError("You are already the host!");
  //       return;
  //   }
  // }

  return (
    <div>
      <Navbar />
    <div className={"mainDetailsContainer"}>
      <div className={"headerContainer"}>
        <h2>{ session.name }</h2>
      </div><div className={"subDetailsContainer"}>
          <p>Hosted by: { session.host }</p>
          <p>Date: { session.date }</p>
          <p>Duration: { session.duration } hour(s)</p>
          <p>Location: { session.interest }</p>
          <p>Interests: { session.address }</p>
          <p>Available Slots Left: { session.slots } </p>
          <p>List of Participants: { session.participants }</p>
          </div>
          {/* <button onClick={handleClick}>Join Session</button> */}
        
      
    
    <br />
    
    
   
    </div>
    </div>
  //   **if host -> display edit/delete 
  //   <div className={"inputContainer"}>
  //     <input
  //       className={"inputButton"}
  //       type="button"
  //       onClick={onEditButtonClick}
  //       value={"Edit Session"}
  //     />
  //   </div>
  //   <div className={"inputContainer"}>
  //     <input
  //       className={"inputButton"}
  //       type="button"
  //       onClick={onDeleteButtonClick}
  //       value={"Delete Session"}
  //     />
  //   </div>
  //   ** else if user == participant -> leave
  //   <div className={"inputContainer"}>
  //     <input
  //       className={"inputButton"}
  //       type="button"
  //       onClick={onLeaveButtonClick}
  //       value={"Leave Session"}
  //     />
  //   </div>
  //   ** else -> join
  //   <div className={"inputContainer"}>
  //   <input
  //     className={"inputButton"}
  //     type="button"
  //     onClick={onJoinButtonClick}
  //     value={"Join Session"}
  //   />
  // </div>
    
  );
}
 
export default SessionDetails;