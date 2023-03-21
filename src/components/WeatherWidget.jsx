import { Card, Col, Row, Spinner } from 'react-bootstrap'
import { IoLocationSharp } from 'react-icons/io5';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, fromUnixTime } from 'date-fns'

const WeatherWidget = () => {
  const [city, setCity] = useState();
  const [weatherData, setWeatherData] = useState();
  const [forecastData, setForecastData] = useState();
  const [apiFailCounter, setAPIFailCounter] = useState(0);

  const apiCallFail = () => {
    setTimeout(() => {
      setAPIFailCounter(apiFailCounter + 1);
    }, 1000);
  };

  useEffect(() => {
    if (apiFailCounter < 3) {
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
          } else {
            console.log('Weather data is undefined or missing properties.');
          }

          if (forecastResponse.data && forecastResponse.data.list) {
            setForecastData(forecastResponse.data);
          } else {
            console.log('Forecast data is undefined or missing properties.');
          }
        })
        .catch(error => {
          apiCallFail(error);
        });
    }
  }, [apiFailCounter]);

  function generateTodayForecast() {
    const city = weatherData.name;
    const countryCode = weatherData.sys.country;
    const temperature = weatherData.main.temp.toFixed(0);
    const iconURL = (`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`);

    return (
      <Row>
        <Col xs="6">
          <img src={iconURL} />
        </Col>
        <Col xs="6" style={{ fontSize: '4rem' }} className="d-flex flex-nowrap justify-content-end">
          {`${temperature}°c`}
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
        <Col key={i} className='text-center'>
          {day}<br />
          <img src={iconURL} style={{ width: '2rem' }} /><br />
          {temperature.toFixed(0)} °
        </Col>
      )
    });
    
    return (
      <Row className='d-flex flex-nowrap'>
        {forecastArray}
      </Row>
    );
  };

  function generateWidgetTitle() {
    const city = weatherData.name;
    const countryCode = weatherData.sys.country;

    return (
      <div className='d-flex justify-content-between'>
      <Card.Title>Weather Widget</Card.Title><div>{`${city}, ${countryCode}`}&nbsp;<IoLocationSharp /></div>
      </div>
    )
  }

  function displayError() {
    return (
      <Col className='p-4'>
        Whoops!<br />
        We were unable to fetch your current weather.
      </Col>
    )
  };

  function displaySpinner() {
    return (
      <Col className='p-4 d-flex justify-content-center'>
        <Spinner animation="border" size='xl' style={{ width: '5rem', height: '5rem' }} />
      </Col>
    )
  };

  function loadContent() {
    if (apiFailCounter >= 3) {
      return displayError();
    }
    else {
      return displaySpinner();
    }
  };

  function generateWeather() {
    return (
      <div>
        {generateTodayForecast()}
        {generate5DayForecast()}
      </div>
    )
  };

  return (
    <div>
      <Card bg="dark" text='light' style={{borderRadius: "15px", padding: "15px"}}>
        <Card.Body>
          
          {weatherData && weatherData.main ? generateWidgetTitle() : <Card.Title> "Weather Widget" </Card.Title>}
          
          {weatherData && weatherData.main ? generateWeather() : loadContent()}
        </Card.Body>
      </Card>
    </div>
  );
};

export default WeatherWidget;