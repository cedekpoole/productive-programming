import { Card, Button, Col, Row } from 'react-bootstrap'
import {FaLocationArrow} from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherWidget = () => {
  const city1 = "London";
  const dataTemp = "5";
  const dataHumidity = "50%";
  const dataWind = "55mph";

  const getIPLocation = () => {
    return ipData;
  }

  const [weatherData, setWeatherData] = useState();
  const [city, setCity] = useState();

  useEffect(() => {
    // Get user's city from ipapi.co
    axios.get('https://ipapi.co/json/')
      .then(response => {
        setCity(response.data.city);
        return response.data.city;
      })
      .then(city => {
        // Fetch weather data using OpenWeatherMap API
        const apiKey = 'a32c896a5efe5c837799909bac3a9141';
        const url = `https://api.openweathermap.org/geo/1.0/direct?limit=5&q=${city}&appid=${apiKey}`;
        return axios.get(url);
      })
      .then(response => {
        // Fetch weather data for the first city returned by OpenWeatherMap API
        const { lat, lon } = response.data[0];
        const apiKey = 'a32c896a5efe5c837799909bac3a9141';
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        return axios.get(url);
      }).then(response => {
        if (response.data && response.data.main) {
          setWeatherData(response.data);
          console.log(response.data);
        } else {
          console.log('Weather data is undefined or missing properties.');
        }
      })
      .catch(error => console.log(error));
  }, []);


  return (
    <div>
      <Card style={{ width: '18rem' }} bg="dark" text='light'>
        <Card.Body>
          <Card.Title>Weather Widget</Card.Title>
          <Row style={{ height: '75%' }}>
            <Col xs="6">{city}<FaLocationArrow className="ml-2"/>
            </Col>
            <Col xs="6" style={{ fontSize: '4rem' }}>{weatherData && weatherData.main ? `${weatherData.main.temp.toFixed(0)}°` : ''}</Col>
          </Row>
          <Row>
        <Col>mon</Col>
        <Col>tue</Col>
        <Col>wed</Col>
        <Col>thu</Col>
        <Col>fri</Col>
      </Row>
        </Card.Body>
      </Card>
    </div>

  );
};

export default WeatherWidget;