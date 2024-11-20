import React from 'react'

const weather = () => {
  return (
    <div className="container mt-5 rounded" style={{backgroundColor:"#3A6D8C"}}>
      <h1 className='text-center p-2'>Weather App</h1>
      <div className="d-flex justify-content-center">
         <div className="row">
          <div className="col-12 rounded mt-5 bg-dark bg-gradient">
            <h4 className='text-white text-center'>Thunder expected around</h4>
            <h1 className='border-bottom'></h1>
          </div> 
          </div>
        </div>
      </div>
  )
}

export default weather