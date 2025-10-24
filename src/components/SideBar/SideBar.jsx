import React, { useContext } from "react";
import "./SideBar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import profileImage from "../../assets/profile-img-D2OYzqU-.svg";


const SideBar = ({ onEditProfileClick, onSignOut }) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__user-info">
        <img
          src={currentUser?.avatar || profileImage}
          alt="User avatar"
          className="sidebar__avatar"
        />
        <p className="sidebar__username">{currentUser?.name || "Terrence Tegegne"}</p>
      </div>

      <div className="sidebar__buttons">
        <button
          className="sidebar__edit-button"
          onClick={onEditProfileClick}
        >
          Change profile data
        </button>

        <button
          className="sidebar__logout-button"
          onClick={onSignOut}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default SideBar;