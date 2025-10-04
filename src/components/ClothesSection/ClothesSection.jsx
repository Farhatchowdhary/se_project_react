import React from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ clothingItems, onCardClick, onAddItemClick })  { 
  
  console.log("Clothing Items in ClothesSection:", clothingItems);
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <h1 className="header__title">Your items</h1>
        <button className="header-btn" onClick={onAddItemClick}>+ Add new</button>

      </div>

      <div className="clothes-section__items">
        <ul className="clothes-section__list">
        {clothingItems.map(item => (
          <li key={item._id} >
          <ItemCard
          card={item}
          onClick={() => onCardClick(item)}
          />
          </li>
        ))}
       </ul>
      </div>
    </div>
  );
}

 export default ClothesSection;
