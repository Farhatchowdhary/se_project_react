import { BrowserRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import "./Header.css";
import logo from "../../assets/Logowtwr.svg";
import profileImage from "../../assets/profile-img.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
// import headerLogo from "../assets/logo.png";


const Header = ({ onAddClick }) => {
  const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(CurrentTemperatureUnitContext);
  return (
    <header className="header">
      {/* Left side: Logo and Date */}
      <div className="header__left">
        <Link 
        to="/"
        onClick={(e) => {
          console.log("Logo link clicked!");
          console.log("Event:", e);
         }}
         style={{ position: "relative", zIndex: 1000}}>
          <img src={logo} alt="WTWR Logo" className="header__logo" />
        </Link>
        <span className="header__date">{currentDate}, New York</span>
      </div>
      {/* Right side: Toggle,Add button,Profile */}
      <div className="header__right">
        <ToggleSwitch />

        <span className="header__add-btn" onClick={onAddClick}>+ Add Clothes</span>
       
        <Link to="/profile">
          <div className="header__user">
            <span className="header__name">Terrence Tegegne</span>
            <img
              src={profileImage}
              alt="Profile"
              className="header__profile-img"
            />
          </div>
        </Link>
      </div>
    </header>
);
};

export default Header; 
