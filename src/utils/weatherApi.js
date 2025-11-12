import { API_KEY, DEFAULT_COORDINATES } from './constants.js';
// src/utils/weather.js

const weatherTypeMap = {
  Clear: "Sunny ☀️",
  Clouds: "Cloudy ☁️",
  Rain: "Rainy 🌧️",
  Drizzle: "Drizzle 🌦️",
  Thunderstorm: "Thunderstorm ⛈️",
  Snow: "Snowy ❄️",
  Mist: "Misty 🌫️"
};

export function getWeatherData() {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${DEFAULT_COORDINATES.lat}&lon=${DEFAULT_COORDINATES.lon}&units=imperial&appid=${API_KEY}`;

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return extractWeatherData(data);
    });
}

export function extractWeatherData(apiResponse) {
  if (!apiResponse || !apiResponse.name || !apiResponse.main || !apiResponse.weather) {
    throw new Error("Invalid API response format");
  }

  const city = apiResponse.name;
  const temperature = {
    F: Math.round(apiResponse.main.temp),
    C: Math.round((apiResponse.main.temp - 32) * 5 / 9)
  };
  const rawWeatherType = apiResponse.weather[0].main;
  const weatherType = weatherTypeMap[rawWeatherType] || rawWeatherType;

  let suggestion;
  const tempF = temperature.F;
  if (tempF >= 86) {
    suggestion = "T-shirt and shorts ";
  } else if (tempF >= 66) {
    suggestion = "Light jacket or long sleeves ";
  } else {
    suggestion = "Warm coat and layers ";
  }


  return { city, temperature, weatherType, suggestion };
}

export function getWeatherCondition(temperature) {
  if (temperature >= 86) {
    return 'hot';
  } else if (temperature >= 66) {
    return 'warm';
  } else {
    return 'cold';
  }
}



