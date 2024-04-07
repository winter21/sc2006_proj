import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  LoadScript,
  useJsApiLoader,
  Autocomplete,
  GoogleMap,
} from "@react-google-maps/api";
import Navbar from "../components/Navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import DefaultAvatar from "../assets/UluPandan.png";
import BackgroundImage from "../assets/RedBg.jpg";
import { Avatar, IconButton } from "@mui/material";
import { colors } from "@mui/material";

const EditSession = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState();
  const [name, setName] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [startHr, setStartHr] = useState("");
  const [startMin, setStartMin] = useState("");
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
  const [dateError, setDateError] = useState("");
  const [timeError, setTimeError] = useState("");
  const [interestError, setInterestError] = useState("");

  const params = useParams();
  const { id } = params;

  const loadSessionPictureToBlob = async (picture) => {
    let blob = await fetch(picture).then(r => r.blob());
    setSessionPicture(blob)
  }
  const handleSelectedDate = (date) => {
    setSelectedDate(date);
  };

  const handleSessionPictureChange = (file) => {
    setSessionPicture(file); 
  };
  
  const handleAddress = (location) => {
    setAddress(location);
  };

  const libraries = ["places"];
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDKEBSYBdvZtuTcN7Lx8Mg6RTBaGtPCOQY",
    libraries: libraries,
  }); 
  
  const searchInput = useRef()

  function onLoad(autocomplete) {
    setSearchResult(autocomplete);
  }

  const onPlaceChanged = (place) => {
    setAddress(searchInput.current.value);
  };

  //const [map, setMap] = useState(/** @type google.maps.Map */(null))

  const fetchSession = async () => {
    try {
      const response = await axios.get("http://localhost:3000/workoutSession/"+ id) 
      setSession(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching session:", error);
    }
  };

  useEffect(() => {
    fetchSession()
  }, []);

  useEffect(() => {
    if (session) {
        setName(session.name)
        setSelectedDate((session.date).split('T')[0])
        const dateTime = new Date(session.date);
        setStartHr(dateTime.getUTCHours().toString());
        setStartMin(String(dateTime.getUTCMinutes()).padStart(2, '0'));
        setDuration(session.duration.toString());
        setSlots(session.slots.toString());
        loadSessionPictureToBlob(`http://localhost:3000/${session.workoutPicture}`)
        //setHasPictureLoaded(session.workoutPicture);
        //console.log(session.slots)
        setAddress(session.address)
        setInterests(session.interest)
    }
    console.log(session)
    //if (!session) return <div>Loading...</div>;
  }, [isLoaded, session]);

  
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    handleAddress(searchInput.current.value);
    setDurationError("")
    setSlotsError("")
    setNameError("")
    setLocationError("")
    setDateError("")
    setTimeError("")
    setInterestError("")

    if (!(interests.length)) {
      setInterestError("Please select at least one workout type")
    }

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
    
    if (searchInput.current.value ===  "") {
      setLocationError("Please select a location");
    }

    if (selectedDate === null) {
      setDateError("Please select a session date");
    }

    if ("" === startHr || "" === startMin ) { 
      setTimeError("Please enter a start time");
    } else if (!isInteger(startHr) || !isInteger(startMin) ) {
      setTimeError("Please enter a valid integer for the start time");
    } else if ((startHr>23) || (startMin>59)) {
      setTimeError("Please enter a valid time");
    } else if ((startHr.length !== 2) || (startMin.length !== 2)) {
      setTimeError("Please enter a start time in 24hr format");
    }
    
    
    if (
        !dateError === "" &&
        !interestError === "" &&
        !locationError === "" &&
        !timeError === "" &&
        !durationError === "" &&
        !slotsError === "" &&
        !nameError === ""
      )
        return;
    updateSes();
  }

  const updateSes = async () => {
    try {
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
      formData.append("date", ( formatDate(selectedDate) + "T" + startHr + ":" + startMin + ":00Z"));
      formData.append("address", address);
      formData.append("duration", duration);
      formData.append("slots", slots);
      formData.append("interest", interests);
      formData.append("type", "workoutPicture");
      for (let entry of formData.entries()) {
        console.log(entry);
      }
      const res = await axios.put(("http://localhost:3000/workoutSession/" + id), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }); 
      console.log(res);
      //navigate((-1), { replace: true });
    } catch (error) {
      console.log(error.stack)
    }
  };
  
  function isInteger(value) {
    return typeof value === 'string' && /^\d+$/.test(value);
  }

  const formatDate = (date) => {
    return format(date, "yyyy-MM-dd");
  };

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
      {/* {session !== undefined && <div>Loading...</div>} */}
      <div style={fullScreenBackgroundStyle} /> 
      <div style={containerStyle}>
      <div className={"mainContainer"}>
      <div className={"headerContainer"}>
        <h2>Edit Your Workout Session</h2>
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
                  : DefaultAvatar  //can change to something else, idk change to wat to show loading.
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
        </label></div><br/>
          <div className={"titleContainer"}>
            <label>Session Name:</label>
          </div>
          <div className={"detailsInputContainer"}>
            <input
              defaultValue={name}
              placeholder="Zenitsu's Workout Session"
              onChange={(e) => setName(e.target.value)}
              className={"inputBox"}
            />
            <label className="errorLabel">{nameError}</label>
          </div>
          <br />
          
          <div className={"titleContainer"}>
            <label>Session Date:</label>
          </div>
          <div className={"detailsInputContainer"}>
            <DatePicker selected={selectedDate} 
            defaultValue={selectedDate}
            onChange={handleSelectedDate}
            dateFormat="yyyy-MM-dd"
            placeholderText="yyyy-mm-dd"
            className={"inputBox"}
            />
            <label className="errorLabel">{dateError}</label>
          </div>
          <br />
          
          <div className={"titleContainer"}>
            <label>Session Start Time (24hr):</label>
          </div>
          <div className={"detailsInputContainer"}>
          <div style={{ display: 'flex'}}>
          <input
              defaultValue={startHr}
              placeholder="01"
              onChange={(e) => setStartHr(e.target.value)}
              className={"timeInputBox"}
              maxLength={2} 
              style={{ marginRight: '10px' }} // Adjust the spacing between input boxes
            />
            <h3>:</h3> 
            <input
            defaultValue={startMin}
            placeholder="23"
            onChange={(e) => setStartMin(e.target.value)}
            className={"timeInputBox"}
            maxLength={2} 
            style={{ marginLeft: '10px' }} 
            />
          </div>
            <label className="errorLabel">{timeError}</label>
            </div>
        
          <br />
          <div className={"titleContainer"}>
            <label>Session Duration (hrs):</label>
          </div>
          <div className={"detailsInputContainer"}>
            <input
              defaultValue={duration}
              placeholder="3"
              onChange={(e) => setDuration(e.target.value)}
              className={"inputBox"}
            />
            <label className="errorLabel">{durationError}</label>
          </div>
          <br />
          <div className={"titleContainer"}>
              <label htmlFor="location-input">Session Location:</label>
            </div>
            <div className={"detailsInputContainer"}>
              <Autocomplete
                onPlaceChanged={(place) => onPlaceChanged(place)}
                onLoad={onLoad}
              >
                <input
                  type="text"
                  defaultValue={address}
                  placeholder="North Hill Gym"
                  size="auto"
                  ref={searchInput}
                  className={"inputBox"}
                />
              </Autocomplete>
              <label className="errorLabel">{locationError}</label>
            </div> 
          <br />
          <div className={"titleContainer"}>
            <label>Max Number of Participants:</label>
          </div>
          <div className={"detailsInputContainer"}>
            <input
              defaultValue={slots}
              placeholder="30"
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
              <label style={{fontSize: 15, color: 'red' }} >{interestError}</label>
          <br />
          <div className={"inputContainer"}>
            <input
              className={"inputButton"}
              type="submit"
              value={"Edit Session"}
            />
          </div> 
        </form>
      </div>
    </div>
    </div>
  );
};

export default EditSession;
