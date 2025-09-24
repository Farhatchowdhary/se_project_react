import WeatherImg from "../../assets/Weather.png"
import "./WeatherCard.css";
const WeatherCard = () => {
  return (
    <>
      <div className="weather-card">
        <img src={WeatherImg} alt="weather" className="weather_img" />
        <span className="weather-deg">75°F</span>
      </div>
      <div>
        <h3 className="weather-card__suggestion">Today is 75° F / You may want to wear:</h3>
      </div>
    </>



  );
};


export default WeatherCard;
