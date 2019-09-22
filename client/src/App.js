import React from 'react';
import Map from './components/Map'
import './App.css';
require("dotenv").config();


function App() {
  return (
    <div className="App" id="container">
      <Map />,
    </div>
  );
}

export default App;
