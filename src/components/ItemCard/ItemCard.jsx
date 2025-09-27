import React from "react";
import "./ItemCard.css";

const ItemCard = ({ card, onClick }) => {
  console.log("Card object:", card);
  console.log("Card.name:", card.name);
  return (
    <div className="item-card" onClick={() => onClick(card)}>
      <h2 className="item-card__title">{card.name}</h2>
      {/* <p className="item-card__description">{card.weather}</p> */}
      <img
        src={card.link}
        alt={card.name}
        className="item-card__image"
      />
    </div>
  );
};

export default ItemCard;


