import React from 'react';

const CurrentWeather = ({ city, currentWeather }) => {
  return (
    <div className="current-weather">
      <h2>Météo actuelle à {city}</h2>
      <p>Température: {currentWeather.main.temp}°C</p>
      <p>Description: {currentWeather.weather[0].description}</p>
      <img
        src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
        alt="Weather icon"
      />
    </div>
  );
};

export default CurrentWeather;
