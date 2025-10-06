import React from "react";
import SideBar from "../../components/SideBar/SideBar";
import "../../components/SideBar/SideBar.css";
import ClothesSection from "../../components/ClothesSection/ClothesSection";
import "../../components/ClothesSection/ClothesSection.css";

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
