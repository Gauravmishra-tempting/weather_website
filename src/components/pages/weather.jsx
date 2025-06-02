import React, { useEffect, useState } from 'react';
import clear from '../../assets/img/sunny.jpg'
import Rain from '../../assets/img/Rain.jpg'
import snow from '../../assets/img/winter.jpg';
import clearNight from '../../assets/img/clearNight.jpg';
import cloudyNight from '../../assets/img/cloudyNight.jpg';

const Weather = () => {
  const api_key = process.env.REACT_APP_APIKEY;
  const [city, setCity] = useState('');
  const [location, setLocation] = useState({ lat: 28.6643, long: 77.243 });
  const [forecast, setForecast] = useState([]);
  const [humidity, setHumidity] = useState(null);
  const [wind, setWind] = useState(null);
  const [backgroundConditon, setBackgroundConditon] = useState(clear);
  const isMobile = window.innerWidth <= 576;
  

  const currentHour = new Date().getHours();

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


      // Extract the city name
      setCity(data.city.name);

      // Set the humidity and wind (using the first forecast item for simplicity)
      const firstForecast = data.list[0];
      setHumidity(firstForecast.main.humidity); // Humidity
      setWind(firstForecast.wind.speed); // Wind speed
      const condition = firstForecast.weather[0].main;
      const icon = firstForecast.weather[0].icon; 
      const isNight = icon.includes('n') || currentHour >= 18 || currentHour <= 6; 
      
      if(condition === "clear"){
        setBackgroundConditon(isNight ? clearNight : clear);
      }else if (condition === "Clouds") {
          setBackgroundConditon(isNight ? cloudyNight : clear);
      }else if (condition === "Rain" || condition === "Drizzle"){
        setBackgroundConditon(Rain);
      }
      else if (condition === "Snow"){
        setBackgroundConditon(snow);
      } else {
        setBackgroundConditon(isNight ? clearNight : clear);
      }
     

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
            icon: `http://openweathermap.org/img/wn/${item.weather[0].icon}.png` ,
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
<div
  className="d-flex justify-content-center align-items-center"
  style={{ minHeight: '100vh' }} // Full screen height
>
    <div className='rounded'
      style = {{
         backgroundImage:  `url(${backgroundConditon})`,
         backgroundSize: 'cover',
         backgroundPosition: 'center',
         backgroundRepeat: 'no-repeat',
         minHeight: '100vh',
         width: '100%',
         padding: isMobile ? '100px 15px' : '120px',
      }}
      >
      <h1 className="text-center text-white mt-5">Weather Website</h1>
        <div className="d-flex justify-content-center align-items-center">
          <div className="col-sm-6 col-md-6 rounded mt-3 bg-dark bg-gradient p-3 mb-3">
            <h4 className="text-white">4-Days Forecast</h4>
            <div className="border-bottom"></div>                   
            {forecast.map((item, index) => (
              <div key={index} className="text-white mt-3">
                <p style={{ color: 'white' }}>
                  {item.day}                             
                <img
                  src={item.icon}
                  alt="Weather Icon"
                  style={{ width: '30px', marginLeft: '30px', marginRight: '30px'}}
                />
                {item.temp}°C
                </p>
              </div>
            ))}
          </div>
          </div>
          <div className="d-flex justify-content-center align-items-center">
          <div className="col-sm-6 col-md-6 rounded bg-dark bg-gradient p-3 mb-3">
            <h4 className="text-white">Weather</h4>
            <div className="border-bottom"></div>
            <p className="text-white mt-2">City  {city}</p>
            <p className="text-white">Humidity  {humidity}%</p>
            <p className="text-white">Wind {wind} km/h</p>
          </div>
        </div>
      </div>
      </div>
  );
};

export default Weather;
