import React from 'react';
import '../App.css';

const ForecastDay = ({ date, forecasts }) => {
  return (
    <div className="forecast-day">
      <h3>{new Date(date).toLocaleDateString('fr-FR', { weekday: 'long' })}</h3>

      <table className="forecast-table">
        <thead>
          <tr>
            <th>Heure</th>
            <th>Température (°C)</th>
            <th>Description</th>
            <th>Icône</th>
          </tr>
        </thead>
        <tbody>
          {forecasts.map((forecast, index) => {
            const time = new Date(forecast.dt_txt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
            const temperature = forecast.main.temp.toFixed(1);
            const description = forecast.weather[0].description;
            const iconUrl = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;

            return (
              <tr key={index}>
                <td>{time}</td>
                <td>{temperature}°C</td>
                <td>{description}</td>
                <td>
                  <img src={iconUrl} alt="Weather icon" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ForecastDay;
