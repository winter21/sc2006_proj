import { BrowserRouter, Route, Routes } from "react-router-dom";
import Start from "./pages/start";
import Login from "./pages/login";
import Signup from "./pages/signup";
import CreateUserInfo from "./pages/createUserInfo";
import ProtectedPage from "./pages/ProtectedPage";
import RequireAuth from "./components/RequireAuth";
import Home from "./pages/home";
import Explore from "./pages/explore";
import CreateSession from "./pages/createSession";
import Onboarding1 from "./pages/onboardingPg1";
import Onboarding2 from "./pages/onboardingPg2";
import Onboarding3 from "./pages/onboardingPg3";
import RequestPasswordReset from "./pages/RequestPasswordReset";
import Profile from "./pages/Profile";
import MySessions from "./pages/mySessions";

import "./App.css";
import { useEffect, useReducer, useState } from "react";
import ResetPassword from "./pages/ResetPassword";
import axios from "axios";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Fetch the user email and token from local storage
    const user = JSON.parse(localStorage.getItem("user"));

    // If the token/email does not exist, mark the user as logged out
    if (!user || !user.token) {
      setLoggedIn(false);
      setUsername("");
      return;
    }

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
      });
    // If the token exists, verify it with the auth server to see if it is valid
    /*const verify = async (user) => {
      try {
        const res = await axios.post(
          "http://localhost:3000/account/check-jwt",
          {
            token: user.token,
          }
        );
        console.log(res);
        console.log("bef:" + loggedIn);
        setLoggedIn(true); //"success" === r.message);
        setUsername(user.username || "");
        console.log(username);
        console.log("aft:" + loggedIn);
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error("Server responded with status:", error.response.status);
          console.error("Response data:", error.response.data);
          console.error("Response headers:", error.response.headers);
          window.alert(error.response.data.message);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received:", error);
          window.alert("No response received from server: " + error.message);
        } else {
          // Something happened in setting up the request that triggered an error
          console.error("Error setting up the request:", error.message);
          window.alert("Error setting up the request: " + error.message);
        }
      }
    //};
    verify(user);*/
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Start
                username={username}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login setLoggedIn={setLoggedIn} setUsername={setUsername} />
            }
          />
          <Route
            path="/signup"
            element={
              <Signup setLoggedIn={setLoggedIn} setUsername={setUsername} />
            }
          />
          <Route
            path="/createUserInfo"
            element={<CreateUserInfo username={username} />}
          />
          <Route
            path="/protected"
            element={
              <RequireAuth loggedIn={loggedIn} username={username}>
                <ProtectedPage />
              </RequireAuth>
            }
          />
          <Route
            path="/home"
            element={
              <RequireAuth loggedIn={loggedIn} username={username}>
                <Home />
              </RequireAuth>
            }
          />
          <Route path="/explore" element={<Explore />} />
          <Route
            path="/CreateSession"
            element={
              <RequireAuth loggedIn={loggedIn} username={username}>
                <CreateSession />
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
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/mySessions"
            element={
              <RequireAuth loggedIn={loggedIn} username={username}>
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
