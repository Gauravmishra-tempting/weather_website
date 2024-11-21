import React, { useEffect, useState } from 'react';
import WbSunnyIcon from '@mui/icons-material/WbSunny';



const Weather = () => {

  const api_key = process.env.REACT_APP_APIKEY;
  const [city, setCity] = useState('');
  const [location, setLocation] = useState({ lat: 28.6654, long: 77.298 });
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
        `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.long}&appid=${api_key}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

     

      // Extracting a 4-day forecast (example logic, adjust as needed)
      const dailyForecast = [];
      let currentDay = null;

      data.list.forEach((item) => {
        const date = new Date(item.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });

        // If it's a new day, add to the forecast array
        if (currentDay !== dayName) {
          dailyForecast.push({
            day: dayName,
            temp: Math.round(item.main.temp - 273.15), // Convert from Kelvin to Celsius
            icon: `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
          });
          currentDay = dayName; // Update current day
        }
      });
      setForecast(dailyForecast.slice(0, 4));
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
                <p style={{ color: 'white' }}>
                  {item.day} {item.temp}°C
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
