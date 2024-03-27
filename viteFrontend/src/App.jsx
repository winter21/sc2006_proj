import { BrowserRouter, Route, Routes} from "react-router-dom";
import Start from "./pages/start";
import Login from "./pages/login";
import Signup from "./pages/signup";
import CreateUserInfo from "./pages/createUserInfo";
import ProtectedPage from "./pages/ProtectedPage";
import RequireAuth from "./components/RequireAuth";
import Home from "./pages/home";
import CreateSession from "./pages/CreateSession";
import Onboarding1 from "./pages/onboardingPg1";
import Onboarding2 from "./pages/onboardingPg2";
import Onboarding3 from "./pages/onboardingPg3";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Start
                email={email}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
              />
            }
          />
          <Route
            path="/login"
            element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />}
          />
          <Route
            path="/signup"
            element={<Signup setLoggedIn={setLoggedIn} setEmail={setEmail} />}
          />
          <Route path="/createUserInfo" element={<CreateUserInfo />} />
          <Route
            path="/protected"
            element={
              <RequireAuth loggedIn={loggedIn} email={email}>
                <ProtectedPage />
              </RequireAuth>
            }
          />
          <Route path="/home" element={<Home />} />
          <Route path="/CreateSession" element={<CreateSession />} />
          <Route path="/onboardingPg1" element={<Onboarding1 />} />
          <Route path="/onboardingPg2" element={<Onboarding2 />} />
          <Route path="/onboardingPg3" element={<Onboarding3 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
