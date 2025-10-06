import React from "react";
import "./SideBar.css"
import profileImage from "../../assets/profile-img.svg";

function SideBar() {
  return (
    <div className="sidebar">
       <img
              src={profileImage}
              alt="Profile"
              className="header__profile-img"
            />
      <h2 className="header__name">Terrence Tegegne</h2>
    </div>
  );
}

export default SideBar;
