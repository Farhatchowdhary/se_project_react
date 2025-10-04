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
 const weatherCondition =
 typeof currentTemp === "number" ? getWeatherCondition(currentTemp) : undefined;

  console.log("Current temp:", currentTemp);
  console.log("Weather condition:", weatherCondition);
  console.log("Items:", items.map(item => ({ name: item.name, weather: item.weather})));
  
  return (
    <ul className="main-container">
      <li key="weather-card">
        <WeatherCard
          weatherData={weatherData}
          onClick={() => weatherData && onCardClick(weatherData)}
        />
      </li>

      {weatherData &&
      Array.isArray(items) &&
        items
          // .filter((item) => {
          //   if (typeof currentTemp !== "number") return false;
          //   return item.weather === weatherCondition;
          // })
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
