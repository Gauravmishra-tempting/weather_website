import React, { useEffect } from 'react'
import WbSunnyIcon from '@mui/icons-material/WbSunny';


const weatherforcast = () => {
  const api_key = process.env.REACT_APP_APIKEY;

 
  const [location, setLocation] = useState({
    long: "",
    lat: ""
  })
  //    useeffect to get longitude and latitude
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setLocation({
          long: position.coords.longitude,
          lat: position.coords.latitude
        })
      })
    }
  }, [])
  

  useEffect(() => {
    fetchapi();
  }, [location])
  const fetchapi = async () => {

    try {
      const response = await fetch(`https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${location.lat}&lon=${location.long}&appid=${api_key}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
    }
    catch (error) {
      console.error('error fetching weather data', error)
    }
  }

}
weatherforcast(37.7749, -122.4194);


const weather = () => {
  return (
    <div className="container mt-5 rounded" style={{ backgroundColor: "#3A6D8C" }}>
      <h1 className='text-center p-2 text-white'>Weather Website</h1>
      <div className="d-flex justify-content-center">
        <div className="row">
          <div className="col-12 rounded mt-5 bg-dark bg-gradient m-5">
            {/* <h4 className='text-white text-center'>Thunder expected around</h4> */}
            <h4 className='text-white mt-2'>4-Days Forecast</h4>
            <h1 className='border-bottom'></h1>
            <p className='text-white'>Today
              <WbSunnyIcon className="ms-5"
                style={{ color: "#FFD43B", fontSize: "24px" }} /></p>
            <p className='text-white'>Thursday<WbSunnyIcon className="ms-4"
              style={{ color: "#FFD43B", fontSize: "24px" }} /></p>
            <p className='text-white'>Friday<WbSunnyIcon className="ms-5"
              style={{ color: "#FFD43B", fontSize: "24px" }} /></p>
            <p className='text-white'>Saturday<WbSunnyIcon className="ms-4"
              style={{ color: "#FFD43B", fontSize: "24px" }} /></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default weather