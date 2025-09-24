import React from "react";
import "./ItemCard.css";

const ItemCard = ({ card, onClick }) => {
    return (
        <div className="item-card" onClick={() => onClick(card)}>
            <h2 className="item-card__title">
                {card.name}</h2>
            <p className="item-card__description">{card.description}</p>
            <img src={card.link} alt="Weather Clothing" className="item-card__image"></img>
        </div>
    );
};

export default ItemCard;


