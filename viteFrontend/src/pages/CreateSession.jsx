import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  LoadScript,
  useJsApiLoader,
  Autocomplete,
  GoogleMap,
} from "@react-google-maps/api";
import Navbar from "../components/Navbar";
import BackgroundImage from "../assets/RedBg.jpg";
import { colors } from "@mui/material";

const CreateSession = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  // const [coordinates, setCoordinates] = useState({
  //   longitude: '',
  //   latitude: ''
  // });
  const [duration, setDuration] = useState("");
  const [slots, setSlots] = useState("");
  const [interests, setInterests] = useState([]);
  const [searchResult, setSearchResult] = useState("");

  const libraries = ["places"];
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDKEBSYBdvZtuTcN7Lx8Mg6RTBaGtPCOQY",
    libraries: libraries,
  });
  const searchInput = useRef();

  //const user = JSON.parse(localStorage.getItem("user"))

  function onLoad(autocomplete) {
    setSearchResult(autocomplete);
  }

  const onPlaceChanged = (place) => {
    setSearchResult(place);
    console.log(searchResult);
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  //const [map, setMap] = useState(/** @type google.maps.Map */(null))

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(user.username)
    const address = searchInput.current.value;
    const session = await axios
      .post("http://localhost:3000/workoutSession/create", {
        name: name,
        date: date + "T" + startTime + ":00Z",
        // coordinates: {
        //   longitude: 90,
        //   latitude: 90
        // },
        address: address,
        duration: duration,
        slots: slots,
        host: user,
        interest: interests,
      })
      .then(() => {
        navigate("/home");
      });
  }

  const handleInterestChange = (interest) => {
    if (!interests.includes(interest)) {
      setInterests([...interests, interest]);
    } else {
      setInterests(interests.filter((item) => item !== interest));
    }
  };

  const workoutInterestExamples = [
    "Weightlifting",
    "Running",
    "Yoga",
    "Cycling",
    "Swimming",
    "HIIT",
    "Pilates",
    "Boxing",
    "CrossFit",
    "Dance",
    "Hiking",
    "Rowing",
  ];

  const containerStyle = {
    borderRadius: "20px",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.5)",
    padding: "40px",
    textAlign: "center",
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
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: -1
  };

  return (
    <div>
      <Navbar />
      <div style={fullScreenBackgroundStyle} /> 
      <div style={containerStyle}>
      <div className={"mainContainer"}>
      <div className={"headerContainer"}>
        <h2>Create a New Workout Session</h2>
          </div>
        <form onSubmit={handleSubmit}>
          <div className={"titleContainer"}>
            <label>Session Name:</label>
          </div>
          <div className={"inputContainer"}>
            <input
              value={name}
              placeholder="eg: Zenitsu's Workout Session"
              onChange={(e) => setName(e.target.value)}
              className={"inputBox"}
            />
          </div>
          <br />
          <div className={"titleContainer"}>
            <label>Session Date:</label>
          </div>
          <div className={"inputContainer"}>
            <input
              value={date}
              placeholder="yyyy-mm-dd"
              onChange={(e) => setDate(e.target.value)}
              className={"inputBox"}
            />
          </div>
          <br />
          <div className={"titleContainer"}>
            <label>Session Start Time:</label>
          </div>
          <div className={"inputContainer"}>
            <input
              value={startTime}
              placeholder="eg: 14:00"
              onChange={(e) => setStartTime(e.target.value)}
              className={"inputBox"}
            />
          </div>
          <br />
          <div className={"titleContainer"}>
            <label>Session Duration:</label>
          </div>
          <div className={"inputContainer"}>
            <input
              value={duration}
              placeholder="How many hours, eg: 2"
              onChange={(e) => setDuration(e.target.value)}
              className={"inputBox"}
            />
          </div>
          <br />
          <div className={"titleContainer"}>
            <label htmlFor="location-input">Session Location:</label>
          </div>
          <div
            className="inputContainer"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Autocomplete
              onPlaceChanged={(place) => onPlaceChanged(place)}
              onLoad={onLoad}
            >
              <input
                type="text"
                placeholder="eg: North Hill Gym"
                size="auto"
                ref={searchInput}
                className={"inputBox"}
              />
            </Autocomplete>
          </div>
          {/* <label>Session coordinates:</label>
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
          /></div><br/> */}
          <br />
          <div className={"titleContainer"}>
            <label>Session Slots:</label>
          </div>
          <div className={"inputContainer"}>
            <input
              value={slots}
              placeholder="Max number of participants, eg: 6"
              onChange={(e) => setSlots(e.target.value)}
              className={"inputBox"}
            />
          </div>
          <br />
          <div className={"titleContainer"}>
            <label>Type of Session:</label>
          </div>
          <div className={"interestsContainer"}>
            {workoutInterestExamples.map((interest, index) => (
              <div
                key={index}
                className={`interestItem ${
                  interests.includes(interest) ? "selectedWorkout" : ""
                }`}
                onClick={() => handleInterestChange(interest)}
              >
                {interest}
              </div>
            ))}
          </div>
          <br />
          <div className={"inputContainer"}>
            <input
              className={"inputButton"}
              type="submit"
              value={"Add Session"}
            />
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default CreateSession;
