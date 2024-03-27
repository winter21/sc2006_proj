import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateSession = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [coordinates, setCoordinates] = useState({
    longitude: '',
    latitude: ''
  });
  const [duration, setDuration] = useState('');
  const [slots, setSlots] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const session = await axios.post('http://localhost:3000/workoutSession/create', {
      name: name, 
      date: date + "T" + startTime + ":00Z", 
      coordinates: {
        longitude: coordinates.longitude,
        latitude: coordinates.latitude
      },
      duration: duration, 
      slots: slots, 
      host: '65fb29f281ef4e9ed5fc5356' 
    }).then(() => {
      navigate("/home")
  })
  };

  return (
    <div className={"mainContainer"}>
      <h2>Create a New Workout Session</h2>
      <form onSubmit={handleSubmit}>
      <div className={"titleContainer"}>
        <label>Session name:</label>
        </div><div className={"inputContainer"}>
        <input  
          value={name}
          placeholder="eg: Zenitsu's Workout Session"          
          onChange={(e) => setName(e.target.value)}
          className={"inputBox"}
        /></div><br/>
        <div className={"titleContainer"}>
        <label>Session date:</label>
        </div><div className={"inputContainer"}>
        <input
          value={date}
          placeholder="yyyy-mm-dd"
          onChange={(e) => setDate(e.target.value)}
          className={"inputBox"}
        /></div><br/>
        <div className={"titleContainer"}>
        <label>Session start time:</label>
        </div><div className={"inputContainer"}>
        <input
          value={startTime}
          placeholder="eg: 14:00"
          onChange={(e) => setStartTime(e.target.value)}
          className={"inputBox"}
        /></div><br/>
        <div className={"titleContainer"}>
      <label>Session duration:</label>
      </div><div className={"inputContainer"}>
      <input
        value={duration}
        placeholder="How many hours, eg: 2"
        onChange={(e) => setDuration(e.target.value)}
        className={"inputBox"}
      /></div><br/>
        <div className={"titleContainer"}>
        <label>Session coordinates:</label>
        <input
          value={coordinates.longitude} 
          placeholder="Longitude, eg: 90"
          onChange={(e) => setCoordinates(prevState => ({
            ...prevState,
            longitude: e.target.value
          }))}
          className={"inputBox"}
        /></div><br/><div className={"inputContainer"}>
        <input
          value={coordinates.latitude}
          placeholder="Latitude, eg: 90"
          onChange={(e) => setCoordinates(prevState => ({
            ...prevState,
            latitude: e.target.value
          }))}className={"inputBox"}
          /></div><br/>
        <div className={"titleContainer"}>
        <label>Session slots:</label>
        </div><div className={"inputContainer"}>
        <input
          value={slots}
          placeholder="Max number of participants, eg: 6"
          onChange={(e) => setSlots(e.target.value)}
          className={"inputBox"}
        /></div><br/>
        <div className={"inputContainer"}>
          <input
            className={"inputButton"}
            type="submit"
            value={"Add Session"}
          />
        </div>
      </form>
    </div>
  );
}
 
export default CreateSession;