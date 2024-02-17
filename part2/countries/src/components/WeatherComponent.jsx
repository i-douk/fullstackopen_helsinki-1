/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import countryService from '../services/countries'

const WeatherComponent = ({ country }) => {
  const [theWeather, setTheWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = () => {
      countryService.getWeather(country.capitalInfo.latlng[0],country.capitalInfo.latlng[1])
        .then(response => {
          setTheWeather(response.data);
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
          <p>Temperature: {theWeather.main.temp} °C </p>
          <img src={`https://openweathermap.org/img/wn/${theWeather.weather[0].icon}@2x.png`} alt=""></img>
          <p>{theWeather.weather.main}</p>
          <p>wind {theWeather.wind.speed} ms</p>
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;