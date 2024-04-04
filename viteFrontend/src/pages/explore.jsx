import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../explore.css";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer
} from "@react-google-maps/api";
import { Box, Typography, CardContent, Card, Slider,  List, ListItem } from "@mui/material";
import Spinner from "../components/Spinner";
import GymIcon from "../assets/gym-icon.png";
import RedBg from "../assets/RedBg.jpg";


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
  const [directionsResult, setDirectionsResult] = useState(null);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
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

  const handleChange = (event, value) => {
    console.log("debug handleChange");
    setSearchRadius(value * 1000); // Convert km back to meters for the searchRadius state
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
              const photos = place.photos
                ? place.photos.map((photo) => photo.getUrl())
                : [];

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

              // Set the details box to be visible
              setIsDetailsVisible(true);
            }
          });
        } else {
          console.error("Error getting distance: ", status);
        }
      }
    );
  };

  const calculateAndDisplayRoute = (destination) => {
    const directionsService = new window.google.maps.DirectionsService();
  
    if (currentPosition) {
      directionsService.route(
        {
          origin: currentPosition,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirectionsResult(result);
          } else {
            window.alert("Directions request failed due to " + status);
          }
        }
      );
    }
  };

  const scrollContainerStyle = {
    display: 'flex',
    overflowX: 'auto',
    // Hiding the scrollbar
    scrollbarWidth: 'none', // For Firefox
    '&::-webkit-scrollbar': {
      display: 'none', // For Chrome, Safari, and Opera
    },
    '-ms-overflow-style': 'none', // For Internet Explorer and Edge
  };
  

  return (
    <div>
      <Navbar />
      <div className="explore-page" style={{ backgroundImage: `url(${RedBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="enter-details">
          <form id="enter-details-form">
            <div className="locationInputBox" style={{ borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', padding: '10px', backgroundColor: 'white' }}> 
              <div className="locationInput">
                <label htmlFor="location-input"><strong>Change Your Location:</strong></label>
                <Autocomplete>
                  <input
                    type="text"
                    id="searchBox"
                    placeholder="Type location"
                    size="auto"
                    ref={searchInput}
                    style={{
                      borderRadius: '20px', 
                      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                      border: 'none',
                      padding: '10px', 
                      width: '115%',
                    }}
                  />
                </Autocomplete>
                <button 
                  className="submit-button"
                  onClick={handleLocationSearch}
                >
                  <strong>Enter</strong>
                </button>

              </div>
            </div>

            <div className="searchRadius" style={{ borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', padding: '10px', backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography gutterBottom style={{fontWeight: 'bold'}}>
              Show <span style={{color: 'red'}}>nearby gyms</span> within radius (km):
              </Typography>
              <Slider
                aria-label="Search Radius"
                value={searchRadius / 1000} // Convert to km for display
                onChange={handleChange}
                valueLabelDisplay="auto"
                step={1}
                min={1}
                max={10}
                marks={[
                  { value: 2, label: '2 km' },
                  { value: 4, label: '4 km' },
                  { value: 6, label: '6 km' },
                  { value: 8, label: '8 km' },
                  { value: 10, label: '10 km' },
                ]}
                sx={{
                  width: '90%',
                  '& .MuiSlider-thumb': {
                    color: 'red', // Changes the thumb color to red
                  },
                  '& .MuiSlider-track': {
                    color: 'red', // Changes the track color to red
                  },
                  '& .MuiSlider-rail': {
                    color: '#e0e0e0', // Optional: change the rail color if needed
                  },
                  '& .MuiSlider-markLabel': {
                    color: 'black', // Optional: change the mark label color if needed
                  },
                }}
              />
            </div>
          </form>
          {/* <div id = 'details-panel'></div> */}
          <Box 
            sx={{ 
              minWidth: 100, 
              mt: '10px', 
              borderRadius: '10px',
              position: 'relative', // This makes it the positioning context
            }} 
            style={{
              display: isDetailsVisible ? 'block' : 'none',
              zIndex: 1050 // Higher than the button to ensure it's in the correct stacking context
            }}
          >
            <button
              className="close-button"
              onClick={() => {
                setIsDetailsVisible(false); // Hide the details box
                setDirectionsResult(null); // Clear the directions result
                // Additional cleanup if necessary
              }}
            >
              Close
            </button>
            <Card variant="outlined" sx={{ width: '100%', border: 'none', boxShadow: 'none', borderRadius: '10px'}}>
              <CardContent sx={{ 
                maxHeight: '53vh', 
                maxWidth:'100%',
                borderRadius: '10px',
                // backgroundColor: 'red',
                overflowY: "auto",
                '&::-webkit-scrollbar': { 
                  display: 'none' 
                },
                '-ms-overflow-style': 'none',  /* IE and Edge */
                'scrollbar-width': 'none',  /* Firefox */
              }}>
                <div style={{
                  borderRadius: '10px', // Rounded edges
                  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', // Shadow effect
                  padding: '20px', // Padding inside the div for some spacing around the content
                  margin: '0px', // Margin outside the div to separate it from other elements or the edge of its container
                }}>
                      
                  <div style={{
                    maxWidth:'400px', 
                    maxheight: '220 px', 
                    overflowX: 'scroll', 
                    overflowY: 'hidden',
                    display: 'flex', 
                    flexDirection: 'row',  
                    alignItems: 'center', 
                    borderRadius: '10px',
                  

                    // Making the scrollbar invisible
                    scrollbarWidth: 'none', /* For Firefox */
                    msOverflowStyle: 'none',  /* For Internet Explorer and Edge */
                    '::-webkit-scrollbar': {
                      display: 'none' /* For WebKit browsers */
                    }
                  }}>
                    {places.photos.map((photoUrl, index) => (
                      <img
                        key={index}
                        src={photoUrl}
                        alt="Place"
                        style={{
                          width: 'auto',
                          height: "200px",
                          marginRight: "5px",
                          borderRadius: '10px', 
                          flexShrink: 0,
                        }}
                      />
                    ))}
                  </div>
                  <Typography variant="h5" gutterBottom style={{fontWeight: 'bold'}}>
                    {places.name}
                    <br></br>
                    <button
                      onClick={() => calculateAndDisplayRoute(places.vicinity)}
                      className="direction-button"
                    >
                      Directions
                    </button>
                  </Typography>
    
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    <span style={{ fontWeight: 'bold', color: 'red' }}>Opening Hours:</span> <br />
                    {places.opening_hours && places.opening_hours
                      .split(/(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)/)
                      .filter(Boolean) // Remove any empty strings that might be caused by the split
                      .reduce((acc, line, index, arr) => {
                        // Combine the day and its hours into single entries in a new array
                        if (index % 2 === 0) { // Even indexes are days of the week
                          acc.push(`${arr[index]} ${arr[index + 1]}`);
                        }
                        return acc;
                      }, [])
                      .map((entry, index, arr) => {
                        // Split each entry into the day and the hours
                        const [day, ...hours] = entry.split(': ');
                        return (
                          <React.Fragment key={index}>
                            {/* Apply bold styling only to the day */}
                            <span style={{ fontWeight: 'bold' }}>{day}:</span> {hours.join(': ')}
                            {index < arr.length - 1 && <br />}
                          </React.Fragment>
                        );
                      })
                    }
                  </Typography>

                  {places.business_status !== 'OPERATIONAL' && (
                    <Typography sx={{ fontSize: 14 }} component="div">
                      Opening Status: {places.business_status}
                    </Typography>
                  )}

                  <Typography variant="body1">
                    <span style={{fontWeight: 'bold', color: 'red' }}>Distance:</span>  {places.distance}
                    <br />
                    <span style={{fontWeight: 'bold', color: 'red' }}>Address:</span> {places.vicinity}
                    <br />
                    <span style={{fontWeight: 'bold', color: 'red' }}>Contact:</span> {places.contact}
                  </Typography>
                </div>

                <div>
                  <h5 className="customer-reviews-heading">
                    Some Customer Reviews:{" "}
                  </h5>
                  {places.reviews.map((review, index) => (
                    <div key={index} className="review-card">
                      <div className="profile-section">
                        {review.profile_photo_url && (
                          <img
                            src={review.profile_photo_url}
                            alt={review.author_name}
                            className="profile-picture"
                          />
                        )}
                        <p className="reviewer-name">{review.author_name}</p>
                      </div>
                      <div className="star-rating">
                        {/* Generate stars based on the review rating */}
                        {Array.from({ length: review.rating }, (_, i) => (
                          <span key={i}>⭐</span> // No need for 'gray-star' class as we're not displaying empty stars
                        ))}
                      </div>
                      <p className="review-text">{review.text}</p>
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
          mapContainerStyle={{ width: "auto", height: "auto", borderRadius: '10px'}}
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
                size: new window.google.maps.Size(50, 50),
                scaledSize: new window.google.maps.Size(50, 50),
              }}
              onClick={() => {
                DisplayMarker(place);
              }}
            />
          ))}{" "}
          {/* onClick={() => { setSelectedMarkers(place); }}*/}
          {directionsResult && (
            <DirectionsRenderer
              options={{
                directions: directionsResult,
              }}
            />
          )}

        </GoogleMap>
      </div>
    </div>
  );
}

export default Explore;




// import React, { useRef, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// //import Navbar from 'scenes/navbar'
// import "../explore.css";
// import {
//   useJsApiLoader,
//   GoogleMap,
//   Marker,
//   Autocomplete,
// } from "@react-google-maps/api";
// //import { useRef, useState} from 'react'
// import { Box, Typography, CardContent, Card } from "@mui/material";
// import Spinner from "../components/Spinner";
// import GymIcon from "../assets/gym-icon.png";

// const libraries = ["places"];
// function Explore() {
//   const { isLoaded } = useJsApiLoader({
//     //idk why i use REACT_APP never work
//     googleMapsApiKey: "AIzaSyDKEBSYBdvZtuTcN7Lx8Mg6RTBaGtPCOQY",
//     libraries: libraries,
//   });
//   //const [map, setMap] = useState(/** @type google.maps.Map */(null))
//   const searchInput = useRef();
//   const mapRef = useRef();

//   const [currentPosition, setCurrentPosition] = useState(null); //what i added
//   const [nearbyPlaces, setNearbyPlaces] = useState([]);
//   const [searchRadius, setSearchRadius] = useState(0);
//   const [markers, setMarkers] = useState([]);
//   const [selectedMarkers, setSelectedMarkers] = useState([]);
//   const [places, setPlaces] = useState({
//     name: "",
//     business_status: "",
//     opening_hours: "",
//     vicinity: "",
//     distance: "",
//     contact: "",
//     photos: [], // Array to store photo URLs
//     reviews: [], // Array to store reviews
//   });

//   //access current location
//   if (navigator.geolocation) {
//     console.log("debug geolocation");
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         if (currentPosition == null)
//           setCurrentPosition({ lat: latitude, lng: longitude });
//       },
//       (error) => {
//         console.error(error);
//         console.log("Geolocation is not supported by this browser.");
//         window.alert("Geolocation is not supported by this browser.");
//       }
//     );
//   } else {
//     console.log("Geolocation is not supported by this browser.");
//     window.alert("Geolocation is not supported by this browser. Error");
//   }

//   //manually search current location
//   const handleLocationSearch = (e) => {
//     console.log("debug handleLocationSearch");
//     e.preventDefault();
//     const geocoder = new window.google.maps.Geocoder();
//     const address = searchInput.current.value;

//     geocoder.geocode({ address }, (results, status) => {
//       if (status === "OK") {
//         const lat = results[0].geometry.location.lat();
//         const lng = results[0].geometry.location.lng();

//         setCurrentPosition({ lat, lng });
//       } else {
//         alert("Geocode was not successful for the following reason: " + status);
//       }
//     });
//   };

//   //modified so code not spam requests
//   useEffect(() => {
//     if (currentPosition) {
//       console.log("new PlacesService object created");
//       //create a new PlacesService object
//       const service = new window.google.maps.places.PlacesService(
//         document.createElement("div")
//       );

//       // Define the request object
//       const request = {
//         location: currentPosition,
//         radius: searchRadius,
//         type: "gym",
//       };

//       // Call the PlacesService nearbySearch method
//       service.nearbySearch(request, (results, status) => {
//         if (status === "OK") {
//           console.log("PlacesService nearbySearch method called");
//           setNearbyPlaces(results);
//           //setMarkers(results);
//         }
//       });
//     }
//   }, [currentPosition, searchRadius]);

//   const handleChange = (event) => {
//     console.log("debug handleChange");
//     setSearchRadius(event.target.value);
//   };

//   if (!isLoaded) {
//     return <Spinner></Spinner>;
//   }

//   const DisplayMarker = (place) => {
//     console.log("debug DisplayMarker");
//     let openingHours = "Not Available";
//     // Create a DistanceMatrixService object
//     const distanceService = new window.google.maps.DistanceMatrixService();
//     // Call the distance matrix service to get the distance between the user's location and the place
//     distanceService.getDistanceMatrix(
//       {
//         origins: [currentPosition],
//         destinations: [place.geometry.location],
//         travelMode: window.google.maps.TravelMode.DRIVING,
//         unitSystem: window.google.maps.UnitSystem.METRIC, // Use metric units (km)
//       },
//       (response, status) => {
//         if (status === "OK") {
//           // Get the distance value from the response
//           const distance = response.rows[0].elements[0].distance.text;

//           console.log(place);

//           //get details
//           const service = new window.google.maps.places.PlacesService(
//             document.createElement("div")
//           );
//           service.getDetails({ placeId: place.place_id }, (place, status) => {
//             if (status === window.google.maps.places.PlacesServiceStatus.OK) {
//               console.log(place); // detailed information about the place
//               openingHours = place.current_opening_hours
//                 ? place.current_opening_hours.weekday_text.join("\n")
//                 : "Not Available";
//               console.log(openingHours);

//               // Process photos
//               const photos = place.photos
//                 ? place.photos.map((photo) => photo.getUrl())
//                 : [];

//               // Process reviews
//               const reviews = place.reviews ? place.reviews : [];

//               setPlaces({
//                 name: place.name,
//                 business_status: place.business_status,
//                 opening_hours: openingHours,
//                 vicinity: place.formatted_address,
//                 distance: distance,
//                 contact: place.formatted_phone_number,
//                 photos,
//                 reviews,
//               });
//             }
//           });
//         } else {
//           console.error("Error getting distance: ", status);
//         }
//       }
//     );
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="explore-page">
//         <div className="enter-details">
//           <form id="enter-details-form">
//             <div className="locationInput">
//               <label htmlFor="location-input">Your Location:</label>

//               <Autocomplete>
//                 <input
//                   type="text"
//                   id="searchBox"
//                   placeholder="Search"
//                   size="auto"
//                   ref={searchInput}
//                 />
//               </Autocomplete>

//               <button type="submit" onClick={handleLocationSearch}>
//                 Enter
//               </button>
//             </div>

//             <div className="searchRadius">
//               <div className={"onboardingContainer"}>Show nearby gyms</div>
//               <label htmlFor="radius-input">Select Search Radius (km):</label>
//               <select
//                 id="radius-input"
//                 value={searchRadius}
//                 onChange={handleChange}
//               >
//                 <option value="">--Select radius--</option>
//                 <option value="1000">1 km</option>
//                 <option value="2000">2 km</option>
//                 <option value="5000">5 km</option>
//                 <option value="10000">10 km</option>
//               </select>
//             </div>
//           </form>
//           {/* <div id = 'details-panel'></div> */}
//           <Box sx={{ minWidth: 100 }}>
//             <Card variant="outlined">
//               <CardContent sx={{ maxHeight: 300, overflowY: "auto" }}>
//                 <div>
//                   {places.photos.map((photoUrl, index) => (
//                     <img
//                       key={index}
//                       src={photoUrl}
//                       alt="Place"
//                       style={{
//                         width: "100px",
//                         height: "100px",
//                         marginRight: "5px",
//                       }}
//                     />
//                   ))}
//                 </div>
//                 <Typography variant="h5" gutterBottom>
//                   Name of Gym: {places.name}
//                 </Typography>
//                 <Typography sx={{ fontSize: 14 }} component="div">
//                   Opening Status: {places.business_status}
//                 </Typography>
//                 <Typography sx={{ mb: 1.5 }} color="text.secondary">
//                   Opening Hours: {places.opening_hours}
//                 </Typography>
//                 <Typography variant="body1">
//                   Distance: {places.distance}
//                   <br />
//                   Vicinity: {places.vicinity}
//                   <br />
//                   Contact: {places.contact}
//                 </Typography>
//                 <div>
//                   <h5 className="customer-reviews-heading">
//                     Some Customer Reviews:{" "}
//                   </h5>
//                   {places.reviews.map((review, index) => (
//                     <div key={index} className="review-card">
//                       <div className="profile-section">
//                         {review.profile_photo_url && (
//                           <img
//                             src={review.profile_photo_url}
//                             alt={review.author_name}
//                             className="profile-picture"
//                           />
//                         )}
//                         <p className="reviewer-name">{review.author_name}</p>
//                       </div>
//                       <div className="star-rating">
//                         {/* Generate stars based on the review rating */}
//                         {Array.from({ length: review.rating }, (_, i) => (
//                           <span key={i}>⭐</span> // No need for 'gray-star' class as we're not displaying empty stars
//                         ))}
//                       </div>
//                       <p className="review-text">{review.text}</p>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </Box>
//         </div>
//         {/* "https://api.mapbox.com/styles/v1/kavita99/streets-v11/static/-122.4194,37.7749,12/500x500?access_token={pk.eyJ1Ijoia2F2aXRhOTkiLCJhIjoiY2xlbGJobXBtMHRwazNwcGRvb2gyczdoNiJ9.9m7kO12Jp60Cjf7Rkushow}" */}
//         {/**some time can work */}
//         <GoogleMap
//           center={currentPosition}
//           zoom={15}
//           mapContainerStyle={{ width: "auto", height: "auto" }}
//           options={{
//             fullscreenControl: false,
//           }}
//           ref={mapRef}
//           //onLoad = {onMapLoad}
//         >
//           {currentPosition && <Marker position={currentPosition} />}
//           {nearbyPlaces.map((place) => (
//             <Marker
//               key={place.place_id}
//               position={place.geometry.location}
//               icon={{
//                 url: GymIcon,
//                 size: new window.google.maps.Size(32, 32),
//                 scaledSize: new window.google.maps.Size(32, 32),
//               }}
//               onClick={() => {
//                 DisplayMarker(place);
//               }}
//             />
//           ))}{" "}
//           {/* onClick={() => { setSelectedMarkers(place); }}*/}
//         </GoogleMap>
//       </div>
//     </div>
//   );
// }
// /*
// const Explore = (props) => {
//   const navigate = useNavigate();

//   return (
//     <div>
//       <Navbar />
//       <p>explore</p>
//     </div>
//   );
// };
// */
// export default Explore;