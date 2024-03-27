import { Link } from "react-router-dom";
import SwoleMates from "../assets/SwoleMates.png";
import Explore from "../assets/ExploreRed.png"
import CreateSession from "../assets/CreateSessionRed.png"
import MySessions from "../assets/MySessionsRed.png"
import Profile from "../assets/ProfileRed.png"

const Navbar = () => {
    return (
      <nav className="navbar">
        <div className="logo">
          <a href="/home">
            <img src={SwoleMates} alt="Home" />
          </a>
        </div>
        <div className="links">
          <a href="/explore">
            <img src={Explore} alt="Explore" />
            Explore
          </a>
          <a href="/createUserSession">
            <img src={CreateSession} alt="Create Session" className="create-session-img" />
            Create
          </a>
          <a href="/mySessions">
            <img src={MySessions} alt="My Sessions" />
            My Sessions
          </a>
          <a href="/profile">
            <img src={Profile} alt="Profile" />
            Profile
          </a>
        </div>
      </nav>
    );
}
 
export default Navbar;
