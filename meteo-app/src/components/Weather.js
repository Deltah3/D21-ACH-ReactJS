import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import SearchBar from './SearchBar';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';
import CityTabs from './CityTabs'; 
import { useGeolocated } from 'react-geolocated';

const Weather = () => {
  const [forecastData, setForecastData] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [cities, setCities] = useState(['Lyon']);
  const [activeCity, setActiveCity] = useState('Lyon');
  const [latLon, setLatLon] = useState({ lat: null, lon: null });
  const [isLoading, setIsLoading] = useState(false);
  const API_KEY = '13c963555badbceeef2991fffe14082a'; 

  
  const { coords, isGeolocationAvailable, isGeolocationEnabled, error } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  });

  useEffect(() => {
    if (coords) {
      setLatLon({ lat: coords.latitude, lon: coords.longitude });
    }
  }, [coords]);

  const fetchLatLon = async (cityName) => {
    setIsLoading(true);
    if (!cityName) {
      console.error('City name is empty');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
      );
      const data = await response.json();

      if (data.length > 0) {
        setLatLon({ lat: data[0].lat, lon: data[0].lon });
      } else {
        console.error('City not found');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des coordonnées', error);
    }
  };

  const fetchCurrentWeather = async (lat, lon) => {
    if (!lat || !lon) return;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}&lang=fr`
      );
      const data = await response.json();
      setCurrentWeather(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données météo actuelles', error);
    }
  };

  useEffect(() => {
    const fetchForecastData = async () => {
      if (latLon.lat && latLon.lon) {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latLon.lat}&lon=${latLon.lon}&units=metric&appid=${API_KEY}&lang=fr`
          );
          const data = await response.json();
          setForecastData(data);
          fetchCurrentWeather(latLon.lat, latLon.lon);
        } catch (error) {
          console.error('Erreur lors de la récupération des données météo', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchForecastData();
  }, [latLon]);

  const handleSearch = () => {
    if (activeCity.trim() !== '') {
      if (!cities.includes(activeCity)) {
        setCities([...cities, activeCity]);
      }
      fetchLatLon(activeCity);
    } else {
      console.error('City input is empty');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const groupForecastByDay = () => {
    if (!forecastData || !forecastData.list) return {};

    return forecastData.list.reduce((acc, forecast) => {
      const date = new Date(forecast.dt_txt);
      const dateKey = date.toISOString().split('T')[0];

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(forecast);
      return acc;
    }, {});
  };

  const handleSelectCity = (city) => {
    setActiveCity(city);
    fetchLatLon(city);
  };

  const handleRemoveCity = (city) => {
    setCities(cities.filter(c => c !== city));
    if (activeCity === city && cities.length > 1) {
      const newActiveCity = cities[0] === city ? cities[1] : cities[0]; 
      setActiveCity(newActiveCity);
      fetchLatLon(newActiveCity);
    }
  };

  const groupedForecasts = groupForecastByDay();

  if (!isGeolocationAvailable) {
    return <p>Votre navigateur ne supporte pas la géolocalisation.</p>;
  }

  if (!isGeolocationEnabled) {
    return <p>La géolocalisation est désactivée. Veuillez l'activer dans les paramètres de votre navigateur.</p>;
  }

  if (error) {
    return <p>Erreur de géolocalisation : {error.message}</p>;
  }

  return (
    <div>
      <h1>Prévisions météo sur 5 jours</h1>

      <SearchBar
        city={activeCity}
        setCity={setActiveCity}
        handleSearch={handleSearch}
        handleKeyDown={handleKeyDown}
      />

      <CityTabs 
        cities={cities} 
        activeCity={activeCity} 
        handleSelectCity={handleSelectCity} 
        handleRemoveCity={handleRemoveCity} 
      />

      {isLoading ? (
        <div className="loader-container">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          {currentWeather && (
            <CurrentWeather city={activeCity} currentWeather={currentWeather} />
          )}

          {Object.keys(groupedForecasts).length > 0 ? (
            <Forecast groupedForecasts={groupedForecasts} />
          ) : (
            !isLoading && <p>Chargement des données météo...</p>
          )}
        </>
      )}
    </div>
  );
};

export default Weather;