import React from "react";
import "./Profile.css";
import SideBar from "../../components/SideBar/SideBar.jsx";
import ClothesSection from "../../components/ClothesSection/ClothesSection.jsx";
import { useNavigate } from "react-router-dom";


const Profile = ({ clothingItems, onAddItemClick, onCardClick, onEditProfileClick, setCurrentUser }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Clear token from localStorage (or wherever you store it)
    localStorage.removeItem("token");

    // Clear user context
    if (setCurrentUser) setCurrentUser(null);

    // Redirect to login page
    navigate("/login");
  };
  return (
    <div className="profile">
      <SideBar
        onEditProfileClick={onEditProfileClick}
        onSignOut={handleSignOut}
      />

      <ClothesSection
        clothingItems={clothingItems}
        onAddItemClick={onAddItemClick}
        onCardClick={onCardClick}
      />

    </div>
  );
};

export default Profile;
