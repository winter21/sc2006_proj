// import React from 'react';
// import Navbar from '../components/Navbar';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
// import gymIconUrl from '../assets/gym-icon.png'; // Import the gym icon

// // this is a private repo, right? so I guess it's fine to put it here?
// const googleMapsApiKey = "AIzaSyDKEBSYBdvZtuTcN7Lx8Mg6RTBaGtPCOQY";

// const mapContainerStyle = {
//   width: '100vw',
//   height: '50vh', 
// };

// const center = {
//   lat: 1.3521, 
//   lng: 103.8198, 
// };

// // just a trial, later must retrieve the data fromt the database. delete this later.
// const gyms = [
//     { id: 1, name: "HARRIS Resort Waterfront Batam", lat: 1.0822706, lng: 103.937175 },
//     { id: 2, name: "SAFRA Toa Payoh", lat: 1.3302722, lng: 103.8546716 },
//       { id: 3, name: "PURE Fitness Asia Square", lat: 1.2784217, lng: 103.8514742 },
//       { id: 4, name: "SWEAT!", lat: 1.276937, lng: 103.840149 },
//       { id: 5, name: "The Little Gym of Singapore East", lat: 1.2920428, lng: 103.8565473 },
//       { id: 6, name: "SAFRA Tampines", lat: 1.3446019, lng: 103.9416649 },
//       { id: 7, name: "Evolve MMA (Far East Square)", lat: 1.282998, lng: 103.8479839 },
//       { id: 8, name: "Woodlands Sports Centre (ActiveSG)", lat: 1.434104, lng: 103.779798 },
//       { id: 9, name: "True Fitness", lat: 1.2929007, lng: 103.8321544 },
//       { id: 10, name: "Bukit Gombak ActiveSG Gym", lat: 1.3596884, lng: 103.7521939 },
//       { id: 11, name: "BXG Boxing & Fitness", lat: 1.3034014, lng: 103.8966606 },
//       { id: 12, name: "Focus Movement | Physiotherapy and Pilates Singapore", lat: 1.2840505, lng: 103.8506619 },
//       { id: 13, name: "Active Red - Singapore's Leading Women Only Kickboxing Fitness Center", lat: 1.2963543, lng: 103.855945 },
//       { id: 14, name: "A&J Creative Danceworld", lat: 1.2843381, lng: 103.8460885 },
//       { id: 15, name: "Active Lifestyle Pte Ltd", lat: 1.3428223, lng: 103.8509529 },
//       { id: 16, name: "SAFRA Jurong", lat: 1.3354052, lng: 103.7059808 },
//       { id: 17, name: "Top Taekwondo Academy(Serangoon)", lat: 1.3575084, lng: 103.8755845 },
//       { id: 18, name: "Bolly Dancing Studio", lat: 1.29875, lng: 103.852071 },
//       { id: 19, name: "Sky Pilates", lat: 1.3060524, lng: 103.8283641 },
//       { id: 20, name: "City Ballet Academy", lat: 1.299295, lng: 103.8456831 }
//   ];

// const gymIcon = {
//   url: gymIconUrl, 
//   scaledSize: new window.google.maps.Size(60, 60), 
// };

// const GymsMap = () => {
//   return (
//     <LoadScript googleMapsApiKey={googleMapsApiKey}>
//       <GoogleMap
//         mapContainerStyle={mapContainerStyle}
//         center={center}
//         zoom={12}
//       >
//         {gyms.map(gym => (
//           <Marker
//             key={gym.id}
//             position={{ lat: gym.lat, lng: gym.lng }}
//             icon={gymIcon}
//             title={gym.name}
//           />
//         ))}
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// const Explore = () => {
//   return (
//     <div>
//       <Navbar />
//       <div className="explore-content">
//         <h1>Explore</h1>
//         <GymsMap />
//       </div>
//     </div>
//   );
// };

// export default Explore;


import React from 'react';
import Navbar from '../components/Navbar';

const Explore = () => {
  return (
    <div>
      <Navbar />
      <div className="explore-content">
        <h1>Explore</h1>
      </div>
    </div>
  );
};

export default Explore;
