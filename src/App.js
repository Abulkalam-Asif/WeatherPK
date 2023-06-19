import React from 'react'
import { Landing, Home } from "./containers/index";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import WeatherState from './context/WeatherState';


const App = () => {
  return (
    <>
      <WeatherState >
        <Router>
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/home" element={<Home />} />
          </Routes>
        </Router>
      </WeatherState>
    </>
  )
}

export default App