import { Card, Button, Col, Row } from 'react-bootstrap'
import {FaLocationArrow} from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState();
  const [city, setCity] = useState();
  const [forecastData, setForecastData] = useState();

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

  function generate5DayForecast() {

    var forecastArray = [];
    var objectElement = 4;

    for (var i = 0; i < 5; i++) {
        var dataSet = {
            dateTime: forecastData.list[objectElement].dt,
            temperature: forecastData.list[objectElement].main.temp,
            iconURL: (`http://openweathermap.org/img/wn/${forecastData.list[objectElement].weather[0].icon}.png`)
        };
        const forecast = <Col key={i}>Mon <br/>
        <img src={dataSet.iconURL} style={{ width: '2rem' }}/><br/>
        {dataSet.temperature.toFixed(0)} °</Col>;

        forecastArray.push(forecast);
        objectElement += 8;
    }
    return forecastArray;

  //   const forecastArray = forecastData.map(
  //     forecast, index => <Col key ={index}>Mon</Col>
  // )
  // console.log(forecastArray);
  // return forecastArray;


}




  return (
    <div>
      <Card style={{ width: '19rem' }} bg="dark" text='light'>
        <Card.Body>
          <Card.Title>Weather Widget</Card.Title>
          <Row style={{ height: '75%' }}>
            <Col xs="6">{weatherData && weatherData.main ? <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}/> : ''}<br/>
            {city}&nbsp;<FaLocationArrow/>
            </Col>
            <Col xs="6" style={{ fontSize: '4rem' }}>{weatherData && weatherData.main ? `${weatherData.main.temp.toFixed(0)}°` : ''}</Col>
          </Row>
          <Row>
        {weatherData && weatherData.main ? generate5DayForecast() : ''}
        {/* <Col>tue</Col>
        <Col>wed</Col>
        <Col>thu</Col>
        <Col>fri</Col> */}
      </Row>
        </Card.Body>
      </Card>
    </div>

  );
};

export default WeatherWidget;