import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
//import Navbar from 'scenes/navbar'
import "../explore.css";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
//import { useRef, useState} from 'react'
import { Box, Typography, CardContent, Card } from "@mui/material";
import Spinner from "../components/Spinner";
import GymIcon from '../assets/gym-icon.png';

const libraries = ["places"];
function Explore() {
  const { isLoaded } = useJsApiLoader({
    //idk why i use REACT_APP never work
    googleMapsApiKey: "AIzaSyDKEBSYBdvZtuTcN7Lx8Mg6RTBaGtPCOQY",
    libraries: libraries,
  });
  //const [map, setMap] = useState(/** @type google.maps.Map */(null))
  const searchInput = useRef();
  const mapRef = useRef();

  const [currentPosition, setCurrentPosition] = useState(null); //what i added
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [searchRadius, setSearchRadius] = useState(0);
  const [markers, setMarkers] = useState([]);
  const [selectedMarkers, setSelectedMarkers] = useState([]);
  const [places, setPlaces] = useState({
    name: "",
    business_status: "",
    opening_hours: "",
    vicinity: "",
    distance: "",
    contact: "",
    photos: [], // Array to store photo URLs
    reviews: [], // Array to store reviews
  });

  //access current location
  if (navigator.geolocation) {
    console.log("debug geolocation");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        if (currentPosition == null)
          setCurrentPosition({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error(error);
        console.log("Geolocation is not supported by this browser.");
        window.alert("Geolocation is not supported by this browser.");
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
    window.alert("Geolocation is not supported by this browser. Error");
  }

  //manually search current location
  const handleLocationSearch = (e) => {
    console.log("debug handleLocationSearch");
    e.preventDefault();
    const geocoder = new window.google.maps.Geocoder();
    const address = searchInput.current.value;

    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK") {
        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();

        setCurrentPosition({ lat, lng });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  };
  /*original code from github but buggy: spamming requests + never retrieve search results on second page

  if (currentPosition) {
    console.log("test");
    //create a new PlacesService object
    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );

    // Define the request object
    const request = {
      location: currentPosition,
      radius: searchRadius,
      type: "gym",
    };

    // Call the PlacesService nearbySearch method
    service.nearbySearch(
      request,
      (results, status) => {
        if (status === "OK") {
          console.log("API requ");
          setNearbyPlaces(results);
          //setMarkers(results);
        }
      },
      [currentPosition]
    );
  } */

  //modified so code not spam requests
  useEffect(() => {
    if (currentPosition) {
      console.log("new PlacesService object created");
      //create a new PlacesService object
      const service = new window.google.maps.places.PlacesService(
        document.createElement("div")
      );

      // Define the request object
      const request = {
        location: currentPosition,
        radius: searchRadius,
        type: "gym",
      };

      // Call the PlacesService nearbySearch method
      service.nearbySearch(request, (results, status) => {
        if (status === "OK") {
          console.log("PlacesService nearbySearch method called");
          setNearbyPlaces(results);
          //setMarkers(results);
        }
      });
    }
  }, [currentPosition, searchRadius]);

  const handleChange = (event) => {
    console.log("debug handleChange");
    setSearchRadius(event.target.value);
  };

  if (!isLoaded) {
    return <Spinner></Spinner>;
  }

  const DisplayMarker = (place) => {
    console.log("debug DisplayMarker");
    let openingHours = "Not Available";
    // Create a DistanceMatrixService object
    const distanceService = new window.google.maps.DistanceMatrixService();
    // Call the distance matrix service to get the distance between the user's location and the place
    distanceService.getDistanceMatrix(
      {
        origins: [currentPosition],
        destinations: [place.geometry.location],
        travelMode: window.google.maps.TravelMode.DRIVING,
        unitSystem: window.google.maps.UnitSystem.METRIC, // Use metric units (km)
      },
      (response, status) => {
        if (status === "OK") {
          // Get the distance value from the response
          const distance = response.rows[0].elements[0].distance.text;

          console.log(place);

          //get details
          const service = new window.google.maps.places.PlacesService(
            document.createElement("div")
          );
          service.getDetails({ placeId: place.place_id }, (place, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              console.log(place); // detailed information about the place
              openingHours = place.current_opening_hours
                ? place.current_opening_hours.weekday_text.join("\n")
                : "Not Available";
              console.log(openingHours);

              // Process photos
              const photos = place.photos ? place.photos.map(photo => photo.getUrl()) : [];

              // Process reviews
              const reviews = place.reviews ? place.reviews : [];

              setPlaces({
                name: place.name,
                business_status: place.business_status,
                opening_hours: openingHours,
                vicinity: place.formatted_address,
                distance: distance,
                contact: place.formatted_phone_number,
                photos,
                reviews,
              });
            }
          });
        } else {
          console.error("Error getting distance: ", status);
        }
      }
    );
  };

  return (
    <div>
      <Navbar />
      <div className="explore-page">
        <div className="enter-details">
          <form id="enter-details-form">
            <div className="locationInput">
              <label htmlFor="location-input">Your Location:</label>

              <Autocomplete>
                <input
                  type="text"
                  id="searchBox"
                  placeholder="Search"
                  size="auto"
                  ref={searchInput}
                />
              </Autocomplete>

              <button type="submit" onClick={handleLocationSearch}>
                Enter
              </button>
            </div>

            <div className="searchRadius">
              <div className={"onboardingContainer"}>Show nearby gyms</div>
              <label htmlFor="radius-input">Select Search Radius (km):</label>
              <select
                id="radius-input"
                value={searchRadius}
                onChange={handleChange}
              >
                <option value="">--Select radius--</option>
                <option value="1000">1 km</option>
                <option value="2000">2 km</option>
                <option value="5000">5 km</option>
                <option value="10000">10 km</option>
              </select>
            </div>
          </form>
          {/* <div id = 'details-panel'></div> */}
          <Box sx={{ minWidth: 100 }}>
            <Card variant="outlined">
            <CardContent sx={{ maxHeight: 300, overflowY: 'auto' }}>
              <div>
                {places.photos.map((photoUrl, index) => (
                  <img key={index} src={photoUrl} alt="Place" style={{ width: "100px", height: "100px", marginRight: "5px" }} />
                ))}
              </div>
              <Typography variant="h5" gutterBottom>
                Name of Gym: {places.name}
              </Typography>
              <Typography sx={{ fontSize: 14 }} component="div">
                Opening Status: {places.business_status}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Opening Hours: {places.opening_hours}
              </Typography>
              <Typography variant="body1">
                Distance: {places.distance}
                <br />
                Vicinity: {places.vicinity}
                <br />
                Contact: {places.contact}
              </Typography>
              <div>
                {places.reviews.map((review, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    {/* Profile Picture */}
                    {review.profile_photo_url && (
                      <img
                        src={review.profile_photo_url}
                        alt={review.author_name}
                        style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }}
                      />
                    )}
                    <div>
                      <p style={{ margin: 0 }}>
                        {review.author_name}: 
                        {/* Star Rating */}
                        {Array.from({ length: review.rating }, (_, i) => (
                          <span key={i}>⭐</span>
                        ))}
                      </p>
                      <p>{review.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            </Card>
          </Box>
        </div>
        {/* "https://api.mapbox.com/styles/v1/kavita99/streets-v11/static/-122.4194,37.7749,12/500x500?access_token={pk.eyJ1Ijoia2F2aXRhOTkiLCJhIjoiY2xlbGJobXBtMHRwazNwcGRvb2gyczdoNiJ9.9m7kO12Jp60Cjf7Rkushow}" */}
        {/**some time can work */}
        <GoogleMap
          center={currentPosition}
          zoom={15}
          mapContainerStyle={{ width: "auto", height: "auto" }}
          options={{
            fullscreenControl: false,
          }}
          ref={mapRef}
          //onLoad = {onMapLoad}
        >
          {currentPosition && <Marker position={currentPosition} />}
          {nearbyPlaces.map((place) => (
            <Marker
              key={place.place_id}
              position={place.geometry.location}
              icon={{
                url: GymIcon,
                size: new window.google.maps.Size(32, 32),
                scaledSize: new window.google.maps.Size(32, 32),
              }}
              onClick={() => {
                DisplayMarker(place);
              }}
            />
          ))}{" "}
          {/* onClick={() => { setSelectedMarkers(place); }}*/}
        </GoogleMap>
      </div>
    </div>
  );
}
/*
const Explore = (props) => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <p>explore</p>
    </div>
  );
};
*/
export default Explore;
