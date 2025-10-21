import React, { useContext } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

const getWeatherCondition = (temperature) => {
  
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66) {
    return "warm";
  } else {
    return "cold";
  }
};

const Main = ({ items, onCardClick, weatherData }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const currentTemp = weatherData?.temperature?.[currentTemperatureUnit];

  return (
    <ul className="main-container">
      <li key="weather-card">
        <WeatherCard
          weatherData={weatherData}
          onClick={() => weatherData && onCardClick(weatherData)}
        />
      </li>

      {weatherData &&
        items
          .filter((item) => {
            if (currentTemp === undefined) return false;
            const weatherCondition = getWeatherCondition(currentTemp);
            return item.weather === weatherCondition;
          })
          .map((card, index) => (
            <li key={card._id || `item-${index}`}>
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
