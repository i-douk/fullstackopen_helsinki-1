/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import countryService from '../services/countries'

const WeatherComponent = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = () => {
      countryService.getWeather(country.capitalInfo.latlng[0],country.capitalInfo.latlng[1])
        .then(response => {
          setWeather(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
          setError(error);
          setLoading(false);
        });
    };

    fetchWeather();
  }, [country]);

  return (
    <div>
      <h2>Weather in {country.name.common}</h2>
      {loading ? (
        <p>Loading weather data...</p>
      ) : error ? (
        <p>Error fetching weather data: {error.message}</p>
      ) : (
        <div>
          <p>Temperature: {weather.main.temp}</p>
          {/* Add more weather information as needed */}
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;