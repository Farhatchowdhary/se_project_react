import React from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
// import { useContext } from 'react';
import CurrentUserContext from "../../contexts/CurrentUserContext";



const ClothesSection = ({ clothingItems, onAddItemClick, onCardClick }) => {

  const currentUser = useContext(CurrentUserContext);

  const filteredItems = clothingItems.filter(item => item.owner === currentUser._id);

  let content;
  if (filteredItems.length === 0) {
    content = <p>No clothing items found</p>;
  } else {
    content = filteredItems.map((item) => (
      <ItemCard
        key={item._id}
        item={item}
        onCardClick={onCardClick}
      />
    ));
  }


  return (
    <section className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">Your items</p>
        <button
          className="clothes-section__add-button"
          onClick={onAddItemClick}
        >
          + Add new
        </button>
      </div>
      <div className="clothes-section__items">

        {content}
      </div>
    </section>
  );
};

export default ClothesSection;