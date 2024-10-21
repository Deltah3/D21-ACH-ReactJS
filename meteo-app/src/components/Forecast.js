import React from 'react';
import ForecastDay from './ForecastDay';

const Forecast = ({ groupedForecasts }) => {
  return (
    <div className="forecast-container">
      {Object.entries(groupedForecasts).map(([date, forecasts]) => (
        <ForecastDay key={date} date={date} forecasts={forecasts} />
      ))}
    </div>
  );
};

export default Forecast;
