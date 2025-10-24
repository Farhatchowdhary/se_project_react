import React from "react";
import "./ItemCard.css";

const ItemCard = ({ card, onClick, onCardLike, likedItems }) => {
  console.log("Card.likes:", card?.likes);
  const isLiked = likedItems.has(card._id);

  // Create the handleLike function
  const handleLike = () => {
    console.log("Like button clicked! Card ID:", card._id, "Current isLiked:", isLiked);
    onCardLike({ id: card._id, isLiked });
  };

  return (
    <div className="item-card" onClick={() => onClick(card)}>
      <h2 className="item-card__title">{card.name}</h2>
      <button
        className={`item-card__like-btn ${isLiked ? 'item-card__like-btn_active' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          handleLike();
        }}
      >
      </button>

      <img
        src={card.imageUrl}
        alt={card.name}
        className="item-card__image"
      />
    </div>
  );
};

export default ItemCard;