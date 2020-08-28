import React from 'react';
import './App.css';
import Routes from './views/navigation/Routes';
import  history from '../src/views/navigation/history';
import NavBar from './views/navigation/NavBar';

function App() {
  return (
  
    <div className="App">
      {/* Bar navigation */}
      {/* <NavBar></NavBar> */}
      {/* Conten main */}
      <Routes/>     
    </div>
  );
}

export default App;
