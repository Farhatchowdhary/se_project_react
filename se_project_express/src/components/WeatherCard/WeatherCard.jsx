import React, { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import WeatherImg from "../../assets/Weather.png";
import SunnyDayImg from "../../assets/sunny.png";
import CloudyDayImg from "../../assets/cloudy.png";
import RainyDayImg from "../../assets/rainy.png";
import SnowyDayImg from "../../assets/Weather.png";
import StormyDayImg from "../../assets/stormy.png";
import FoggyDayImg from "../../assets/foggy.png";
import "./WeatherCard.css";


const getBackgroundClass = (weatherData) => {
  if (!weatherData || !weatherData.weather || !weatherData.weather[0]) {
    return "weather-card__default";
  }

  const weatherCondition = weatherData.weather[0].main.toLowerCase(); const currentTime = new Date().getHours();
  const isDaytime = currentTime >= 6 && currentTime < 18;

  // return css class names based on weather and time
  if (weatherCondition.includes('clear') || weatherCondition.includes('sun')) {
    return isDaytime ? "weather-card__sunny-day" : "weather-card__clear-night";
  } else if (weatherCondition.includes('cloud')) {
    return isDaytime ? "weather-card__cloudy-day" : "weather-card__cloudy-night";
  } else if (weatherCondition.includes('rain')) {
    return isDaytime ? "weather-card__sunny-day" : "weather-card__rainy-night";
  } else if (weatherCondition.includes('snow')) {
    return "weather-card__snowy";
  }

  return "weather-card__default";
};


const WeatherCard = ({ weatherData }) => {
  console.log("WeatherCard is rendering!");
  console.log("weatherData:", weatherData);

  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temperature = weatherData?.temperature[currentTemperatureUnit];

  return (
    <>
      <div className={`weather-card ${getBackgroundClass(weatherData)}`}>
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
