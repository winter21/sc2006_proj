import React, { useState, useRef, useEffect } from "react";
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
import DefaultAvatar from "../assets/UluPandan.png";
import { Avatar, IconButton } from "@mui/material";
import { colors } from "@mui/material";

const CreateSession = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [startHr, setStartHr] = useState("");
  const [startMin, setStartMin] = useState("");
  // const [coordinates, setCoordinates] = useState({
  //   longitude: '',
  //   latitude: ''
  // });
  const [duration, setDuration] = useState("");
  const [slots, setSlots] = useState("");
  const [interests, setInterests] = useState([]);
  const [searchResult, setSearchResult] = useState("");
  const [sessionPicture, setSessionPicture] = useState(null);
  const [address, setAddress] = useState("");
  const [nameError, setNameError] = useState("");
  const [durationError, setDurationError] = useState("");
  const [slotsError, setSlotsError] = useState("");
  const [locationError, setLocationError] = useState("");


  const handleSessionPictureChange = (file) => {
    setSessionPicture(file); 
  };
  
  const handleAddress = (event) => {
    setAddress(event);
  };

  const libraries = ["places"];
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDKEBSYBdvZtuTcN7Lx8Mg6RTBaGtPCOQY",
    libraries: libraries,
  });
  const searchInput = useRef()

  //const user = JSON.parse(localStorage.getItem("userID"))

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
    setDurationError("")
    setSlotsError("")
    setNameError("")
    setLocationError("")

    if ("" === name) {
      setNameError("Please enter a session name");
    }

    if ("" === duration) { 
      setDurationError("Please enter a duration");
    } else if (!isInteger(duration)) {
      setDurationError("Please enter a valid integer for duration");
    }
    
    if ("" === slots) { 
      setSlotsError("Please enter the number of slots");
    } else if (!isInteger(slots)) {
      setSlotsError("Please enter a valid integer for the number of slots");
    }
    
    if (address.trim() === "") {
      setLocationError("Please select a location");
    }

    if (!durationError === "" && !slotsError === "" && !nameError === "") return;
    createSes();
  }

  const createSes = async () => {
    try {
      handleAddress(searchInput.current.value);
      const formData = new FormData();
      if(!sessionPicture){
        let blob = await fetch(DefaultAvatar).then(r => r.blob());
        const defaultFile = new File([blob], "DefaultAvatar.png", {
          type: "image/png",
        });
        formData.append("photo", defaultFile);
      }else{
        formData.append("photo", sessionPicture);
      }
      formData.append("name", name);
      formData.append("date", (date + "T" + startTime + ":00Z"));
      formData.append("address", address);
      formData.append("duration", duration);
      formData.append("slots", slots);
      formData.append("host", "65fb29f281ef4e9ed5fc5356");
      formData.append("interest", interests);
      formData.append("type", "workoutPicture");
      formData.append("on", true);
      const res = await axios.post("http://localhost:3000/workoutSession/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }); 
      console.log(res);
      navigate("/home", { replace: true });
    } catch (error) {
      console.log(error.stack)
    }
  };
  
  function isInteger(value) {
    // Use parseInt to parse the value and check if it's a valid integer
    return typeof value === 'string' && /^\d+$/.test(value);
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

  const imageContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
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
      <div style={imageContainerStyle}>
        <input
          accept="image/*"
          //className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
          onChange={(e) =>
            handleSessionPictureChange(e.target.files[0])
          }
          style={{
            display: "none",
          }}
          ref={(input) => {
            // Store a reference to the input element
            if (input) {
              input.value = ""; // Reset the input value
              input.defaultValue = DefaultAvatar; // Set the default file
            }
          }}
        />
        <label htmlFor="contained-button-file">
          <IconButton component="span">
            <Avatar
              src={
                sessionPicture
                  ? URL.createObjectURL(sessionPicture)
                  : DefaultAvatar
              }
              style={{
                margin: "10px",
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                border: "8px solid #ccc",
              }}
            />
          </IconButton>
        </label></div>
      <div>Click on the Session Picture to upload an image</div><br/>
          <div className={"titleContainer"}>
            <label>Session Name:</label>
          </div>
          <div className={"inputContainer"}
              style={{
                alignItems: "center",
              }}><input
              value={name}
              placeholder="eg: Zenitsu's Workout Session"
              onChange={(e) => setName(e.target.value)}
              className={"inputBox"}
            />
            <label className="errorLabel">{nameError}</label>
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
            <label>Session Start Time (24hr):</label>
          </div>
          <div className={"detailsInputContainer"}>
  <div style={{ display: 'flex' }}>
          <input
              value={startHr}
              placeholder="01"
              onChange={(e) => setStartHr(e.target.value)}
              className={"timeInputBox"}
              style={{ marginRight: '10px' }} // Adjust the spacing between input boxes
            />
            <h3>:</h3> 
            <input
            value={startMin}
            placeholder="59"
            onChange={(e) => setStartMin(e.target.value)}
            className={"timeInputBox"}
            style={{ marginLeft: '10px' }} 
            />
          </div>
        </div>
        
          <br />
          <div className={"titleContainer"}>
            <label>Session Duration:</label>
          </div>
          <div className={"inputContainer"}
              style={{
                alignItems: "center",
              }}><input
              value={duration}
              placeholder="How many hours, eg: 2"
              onChange={(e) => setDuration(e.target.value)}
              className={"inputBox"}
            />
            <label className="errorLabel">{durationError}</label>
          </div>
          <br />
          <div className={"titleContainer"}>
            <label htmlFor="location-input">Session Location:</label>
          </div>
          <div
            className="inputContainer"
            style={{
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
              <label className="errorLabel">{locationError}</label>
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
          <div className={"inputContainer"}
              style={{
                alignItems: "center",
              }}><input
              value={slots}
              placeholder="Max number of participants, eg: 6"
              onChange={(e) => setSlots(e.target.value)}
              className={"inputBox"}
            />
            <label className="errorLabel">{slotsError}</label>
          </div>
          <br />
          <div className={"titleContainer"}>
            <label>Type of Session:</label>
          </div>
          <div className={"interestsContainer"} >
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
