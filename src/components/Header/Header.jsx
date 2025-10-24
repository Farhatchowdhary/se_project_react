// import { BrowserRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import "./Header.css";
import logo from "../../assets/Logowtwr.svg";
import profileImage from "../../assets/profile-img.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";


const Header = ({ onAddClick, onLoginClick, onRegisterClick, isLoggedIn  }) => {
   const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(CurrentTemperatureUnitContext);
  const currentUser = useContext(CurrentUserContext);
  
  console.log("=== HEADER DEBUG ===");
  console.log("isLoggedIn:", isLoggedIn);
  console.log("currentUser:", currentUser);
  
  
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
      
      
      {/* Right side: Toggle, Add button/Login buttons, Profile */}
      <div className="header__right">
        <ToggleSwitch />
        
        {isLoggedIn ? (
          // Logged-in user view
          <>
            <span className="header__add-btn" 
            onClick={onAddClick}>+ Add Clothes</span>
            <Link to="/profile">
              <div className="header__user">
                <span className="header__name">{currentUser.name || "Terrence Tegegne"}</span>
                <img
                  src={currentUser.avatar || profileImage}
                  alt="Profile"
                  className="header__profile-img"
                />
              </div>
            </Link>
          </>
        ) : (
          // Non-logged-in user view
          <div className="header__auth-buttons">
            <button className="header__signup-btn" onClick={onRegisterClick}>
              Sign Up
            </button>

    <button 
  className="header__login-btn" 
  onClick={(e) => {
    console.log("=== BUTTON CLICK DEBUG ===");
    console.log("Event object:", e);
    console.log("Button element:", e.target);
    console.log("onLoginClick function:", onLoginClick);
    console.log("typeof onLoginClick:", typeof onLoginClick);
    
    if (onLoginClick) {
      console.log("Calling onLoginClick...");
      onLoginClick();
      console.log("onLoginClick called successfully!");
    } else {
      console.log("ERROR: onLoginClick is undefined!");
    }
  }}
  style={{ position: "relative", zIndex: 1000, cursor: "pointer" }}
>
  Log In
</button>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header; 
