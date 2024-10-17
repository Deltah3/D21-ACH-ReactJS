import logo from './logo.svg';
import './App.css';

import React from 'react';
import Weather from './components/Weather'; // Importer le composant météo


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main>
        <div className="weather-block"> 
          <Weather />
        </div>
      </main>
    </div>
  );
}

export default App;