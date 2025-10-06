import React from "react";
import "./Profile.css";
import SideBar from "../../components/SideBar/SideBar";
import ClothesSection from "../../components/ClothesSection/ClothesSection";

const Profile = ({clothingItems, onAddClick, onCardClick}) => {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection  
      clothingItems={clothingItems}
       onAddItemClick={onAddClick}
       onCardClick={onCardClick}
        />
    </div>
  );
};

export default Profile;
