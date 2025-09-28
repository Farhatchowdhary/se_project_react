
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

export function extractWeatherData(apiResponse) {
  if (!apiResponse || !apiResponse.name || !apiResponse.main || !apiResponse.weather) {
    throw new Error("Invalid API response format");
  }

  const city = apiResponse.name;
  const temperature = {
    F : Math.round((apiResponse.main.temp - 273.15) * 9/5 + 32);
    C : Math.round(apiResponse.main.temp - 273.15) 
  };
  const rawWeatherType = apiResponse.weather[0].main;
  const weatherType = weatherTypeMap[rawWeatherType] || rawWeatherType;

  return { city, temperature, weatherType };
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



