import React from "react";
import "./Header.css";
import logo from "../../assets/Logowtwr.svg";
import profileImage from "../../assets/profile-img.svg";

const Header = ({ onAddClick }) => {
  const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });
  return (
    <header className="header">
      <div className="header__left">
        <img src={logo} alt="WTWR Logo" className="header__logo" />
        <span className="header__date">{currentDate}, New York</span>
      </div>
      <div className="header__right">

        <span className="header__add-btn" onClick={onAddClick}>+ Add Clothes</span>

        <div className="header__user">
          <span className="header__name">Terrence Tegegne</span>
          <img
            src={profileImage}
            alt="Profile"
            className="header__profile-img"
          />
        </div>
      </div>

    </header>
  );
};

export default Header; 
