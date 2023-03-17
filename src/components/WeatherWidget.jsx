import { Card, Col, Row } from 'react-bootstrap'
import { IoLocationSharp } from 'react-icons/io5';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, fromUnixTime } from 'date-fns'

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState();
  const [forecastData, setForecastData] = useState();
  const [city, setCity] = useState();

  useEffect(() => {
    // Get user's city from ipapi.co
    axios.get('https://ipapi.co/json/')
      .then(response => {
        setCity(response.data.city);
        return response.data.city;
      })
      .then(city => {
        // Fetch weather data and forecast using OpenWeatherMap API
        const apiKey = 'a32c896a5efe5c837799909bac3a9141';
        const urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

        return Promise.all([
          axios.get(urlWeather),
          axios.get(urlForecast)
        ]);
      })
      .then(([weatherResponse, forecastResponse]) => {
        if (weatherResponse.data && weatherResponse.data.main) {
          setWeatherData(weatherResponse.data);
          console.log(weatherResponse.data);
        } else {
          console.log('Weather data is undefined or missing properties.');
        }

        if (forecastResponse.data && forecastResponse.data.list) {
          setForecastData(forecastResponse.data);
          console.log(forecastResponse.data);
        } else {
          console.log('Forecast data is undefined or missing properties.');
        }
      })
      .catch(error => console.log(error));
  }, []);

  function generateTodayForecast() {
    const city =  weatherData.name;
    const countryCode =  weatherData.sys.country;
    const temperature = weatherData.main.temp.toFixed(0);
    const iconURL = (`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`);

    return (
      <Row>
        <Col xs="6">
          <img src={iconURL} /><br />
          {`${city}, ${countryCode}`}&nbsp;<IoLocationSharp />
        </Col>
        <Col xs="6" style={{ fontSize: '4rem' }}>
          {`${temperature}°`}
        </Col>
      </Row>
    );
  };

  function generate5DayForecast() {
    const dateIndex = [4, 12, 20, 28, 36];
    const forecastArray = dateIndex.map((dateIndex, i) => {

      const day = format(fromUnixTime(forecastData.list[dateIndex].dt), "EEE");
      const temperature = forecastData.list[dateIndex].main.temp;
      const iconURL = (`http://openweathermap.org/img/wn/${forecastData.list[dateIndex].weather[0].icon}.png`);

      return (
        <Col key={i}>
          {day}<br />
          <img src={iconURL} style={{ width: '2rem' }} /><br />
          {temperature.toFixed(0)} °
        </Col>
      )
    });
    return forecastArray;
  };


  return (
    <div>
      <Card style={{ width: '19rem' }} bg="dark" text='light'>
        <Card.Body>
          <Card.Title>Weather Widget</Card.Title>
          <Row style={{ height: '75%' }}>
            {weatherData && weatherData.main ? generateTodayForecast() : ''}
          </Row>
          <Row>
            {weatherData && weatherData.main ? generate5DayForecast() : ''}
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default WeatherWidget;