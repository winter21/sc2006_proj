import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Start from "./pages/start";
import Login from "./pages/login";
import Signup from "./pages/signup";
import CreateUserInfo from "./pages/createUserInfo";
import RequireAuth from "./components/RequireAuth";
import Home from "./pages/home";
import Explore from "./pages/explore";
import CreateSession from "./pages/CreateSession";
import SessionDetails from "./pages/sessionDetails";
import EditSession from "./pages/EditSession";
import Onboarding1 from "./pages/onboardingPg1";
import Onboarding2 from "./pages/onboardingPg2";
import Onboarding3 from "./pages/onboardingPg3";
import RequestPasswordReset from "./pages/RequestPasswordReset";
import Profile from "./pages/Profile";
import MySessions from "./pages/mySessions";
import Spinner from "./components/Spinner";

import "./App.css";
import { useEffect, useReducer, useState } from "react";
import ResetPassword from "./pages/ResetPassword";
import axios from "axios";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the user email and token from local storage
    const user = JSON.parse(localStorage.getItem("user"));

    // If the token/email does not exist, mark the user as logged out
    if (!user || !user.token) {
      setLoggedIn(false);
      setUsername("");
      setLoading(false);
      return;
    }
    /*
    fetch("http://localhost:3000/account/check-jwt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify the content type as JSON
      },
      body: JSON.stringify({
        // Convert the body object to a JSON string
        token: user.token,
      }),
    })
      .then((r) => r.json())
      .then((r) => {
        console.log("bef:" + loggedIn);
        console.log(r);
        setLoggedIn(true); //setLoggedIn("success" === r.message);
        setUsername(user.username || "");
        console.log("aft:" + loggedIn);
        //setEmail(user.email || "");
      });*/
    // If the token exists, verify it with the auth server to see if it is valid
    const verify = async (user) => {
      try {
        const res = await axios.post(
          "http://localhost:3000/account/check-jwt",
          {
            token: user.token,
          }
        );
        console.log(res);
        setLoggedIn(true); //"success" === r.message);
        setUsername(user.username || "");
        setLoading(false);
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error("Server responded with status:", error.response.status);
          console.error("Response data:", error.response.data);
          console.error("Response headers:", error.response.headers);
          window.alert(error.response.data.message);
          setLoading(false);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received:", error);
          window.alert("No response received from server: " + error.message);
          setLoading(false);
        } else {
          // Something happened in setting up the request that triggered an error
          console.error("Error setting up the request:", error.message);
          window.alert("Error setting up the request: " + error.message);
          setLoading(false);
        }
      }
    };
    verify(user);
  }, []);

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              loggedIn ? (
                <Navigate to="/home" replace />
              ) : (
                <Start
                  username={username}
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                />
              )
            }
          />
          <Route
            path="/login"
            element={
              <Login setLoggedIn={setLoggedIn} setUsername={setUsername} />
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/createUserInfo"
            element={
              <CreateUserInfo
                setLoggedIn={setLoggedIn}
                setUsername={setUsername}
              />
            }
          />
          <Route
            path="/home"
            element={
              <RequireAuth loggedIn={loggedIn}>
                <Home />
              </RequireAuth>
            }
          />
          <Route path="/explore" element={<Explore />} />
          <Route
            path="/createSession"
            element={
              <RequireAuth loggedIn={loggedIn}>
                <CreateSession />
              </RequireAuth>
            }
          />
          <Route
            path="/sessionDetails/:id"
            element={
              <RequireAuth loggedIn={loggedIn}>
                <SessionDetails />
              </RequireAuth>
            }
          />
          <Route
            path="/editSession/:id"
            element={
              <RequireAuth loggedIn={loggedIn}>
                <EditSession />
              </RequireAuth>
            }
          />
          <Route path="/onboardingPg1" element={<Onboarding1 />} />
          <Route path="/onboardingPg2" element={<Onboarding2 />} />
          <Route path="/onboardingPg3" element={<Onboarding3 />} />
          <Route
            path="/request-reset-password"
            element={<RequestPasswordReset />}
          />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/profile"
            element={
              <RequireAuth loggedIn={loggedIn}>
                <Profile setLoggedIn={setLoggedIn} setUsername={setUsername} />
              </RequireAuth>
            }
          />
          <Route
            path="/mySessions"
            element={
              <RequireAuth loggedIn={loggedIn}>
                <MySessions />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
