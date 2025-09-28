import React, { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import WeatherImg from "../../assets/Weather.png"
import "./WeatherCard.css";
const WeatherCard = ({weatherData}) => {
  const {currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temperature = weatherData?.temperature[currentTemperatureUnit];
  return (
    <>
      <div className="weather-card">
        <img src={WeatherImg} alt="weather" className="weather_img" />
        <span className="weather-deg">{temperature}°{currentTemperatureUnit}</span>
      </div>
      <div>
        <h3 className="weather-card__suggestion">
          Today is {temperature}°{currentTemperatureUnit} / You may want to wear:</h3>
      </div>
    </>



  );
};


export default WeatherCard;
