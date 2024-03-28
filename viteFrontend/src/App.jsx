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

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

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
          <Route path="/home" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/CreateSession" element={<CreateSession />} />
          <Route path="/onboardingPg1" element={<Onboarding1 />} />
          <Route path="/onboardingPg2" element={<Onboarding2 />} />
          <Route path="/onboardingPg3" element={<Onboarding3 />} />
          <Route path="/request-reset-password" element={<RequestPasswordReset/>} />
          <Route path="/reset-password" element={<ResetPassword/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mySessions" element={<MySessions />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
