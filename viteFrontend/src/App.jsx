import { BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import CreateUserInfo from "./pages/createUserInfo";
import ProtectedPage from "./pages/ProtectedPage";
import RequireAuth from "./components/RequireAuth";
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
              <Home
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
