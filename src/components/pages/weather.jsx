import React, { useEffect, useState } from 'react';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

const Weather = () => {
  const api_key = process.env.REACT_APP_APIKEY;

  const [location, setLocation] = useState({ lat: null, long: null });
  const [forecast, setForecast] = useState([]);

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            long: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  // Fetch weather data when location changes
  useEffect(() => {
    if (location.lat && location.long) {
      fetchWeatherData();
    }
  }, [location]);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.long}&appid=43cf2c46a80c7f13361c6e0fe7181f0a`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // Extracting a 4-day forecast (example logic, adjust as needed)
      const fourDayForecast = data.list
        .slice(0, 4 * 24) // Assuming hourly data, slice for 4 days
        .map((item) => {
          const date = new Date(item.dt * 1000);
          return {
            day: date.toLocaleDateString('en-US', { weekday: 'long' }),
            temp: Math.round(item.main.temp - 273.15), // Convert Kelvin to Celsius
            icon: `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
          };
        });

      setForecast(fourDayForecast);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div className="container mt-5 rounded" style={{ backgroundColor: '#3A6D8C' }}>
      <h1 className="text-center p-2 text-white">Weather Website</h1>
      <div className="d-flex justify-content-center">
        <div className="row">
          <div className="col-12 rounded mt-5 bg-dark bg-gradient m-5">
            <h4 className="text-white mt-2">4-Days Forecast</h4>
            <div className="border-bottom"></div>
            {forecast.map((item, index) => (
              <div key={index} className="text-white mt-3">
                <p>
                  {item.day}: {item.temp}°C
                  <img
                    src={item.icon}
                    alt="Weather Icon"
                    style={{ width: '30px', marginLeft: '10px' }}
                  />
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
