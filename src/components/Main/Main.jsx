import React from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";

const Main = ({ items, onCardClick }) => {
  return (
    <ul className="main-container">
      <li>
        <WeatherCard />
      </li>

      {/* Map through items */}
      {items.map((card) => (
        <li key={card._id}>
          <ItemCard
            card={card}
            title={card.name}
            description={card.description}
            onClick={() => onCardClick(card)}
          />
        </li>
      ))}
    </ul>
  );
};



export default Main;
