import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';

function App() {
  
  return (
    <div className="App">
      <header className="App-header">
          <h1>Find a Lens</h1>
          <h3>Search for Photographers in Your Area</h3>
          <HomePage />
      </header>
    </div>
    );
  }

export default App;
