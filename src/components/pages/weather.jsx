import React from 'react'
import WbSunnyIcon from '@mui/icons-material/WbSunny';


const weatherforcast = async (lat, lon) => {
  const api_key = '43cf2c46a80c7f13361c6e0fe7181f0a';
  const api = 
  `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${api_key}`;

  try{
    const response = await fetch(api);
    if(!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
  }
  catch(error){
    console.error('error fetching weather data', error)
  }
}
weatherforcast(37.7749, -122.4194);


const weather = () => {
  return (
    <div className="container mt-5 rounded" style={{backgroundColor:"#3A6D8C"}}>
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
              style={{ color: "#FFD43B", fontSize: "24px"  }} /></p>
            <p className='text-white'>Saturday<WbSunnyIcon className="ms-4" 
              style={{ color: "#FFD43B", fontSize: "24px" }} /></p>
          </div> 
          </div>
        </div>
      </div>
  )
}

export default weather