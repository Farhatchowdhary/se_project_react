import React from "react";
import "./Profile.css";
// import SideBar from "../../Components/SideBar/SideBar.jsx";
// import ClothesSection from "../../Components/ClothesSection/ClothesSection.jsx";

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
