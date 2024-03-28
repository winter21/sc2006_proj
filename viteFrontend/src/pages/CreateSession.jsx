import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  LoadScript,
  useJsApiLoader,
  Autocomplete,
  GoogleMap,
} from "@react-google-maps/api";
import Navbar from "../components/Navbar";

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

  const libraries = ["places"];
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDKEBSYBdvZtuTcN7Lx8Mg6RTBaGtPCOQY",
    libraries: libraries,
  });

  const [searchResult, setSearchResult] = useState("");

  const searchInput = useRef();

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
        host: "65fb29f281ef4e9ed5fc5356",
        interest: interests,
      })
      .then(() => {
        navigate("/home");
      });
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

  return (
    <div>
      <Navbar />
      <div className={"mainContainer"}>
        <h2>Create a New Workout Session</h2>
        <form onSubmit={handleSubmit}>
          <div className={"titleContainer"}>
            <label>Session name:</label>
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
            <label>Session date:</label>
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
            <label>Session start time:</label>
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
            <label>Session duration:</label>
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
            <label>Session slots:</label>
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
  );
};

export default CreateSession;
