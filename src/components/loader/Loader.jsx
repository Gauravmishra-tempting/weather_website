import React from 'react';
import './Loader.css'; // Optional: CSS for styling

const Loader = () => {
  return (
    <div className="loader-container">
      {/* You can replace this with any loading animation or spinner */}
      <div className="spinner"></div>
      <p>Loading, please wait...</p>
    </div>
  );
};

export default Loader;
