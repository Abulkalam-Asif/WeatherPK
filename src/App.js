import React from 'react'
import { Landing, Weather } from "./pages";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import WeatherState from './context/WeatherState';


const App = () => {
  return (
    <>
      <WeatherState>
        <Router>
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/weather" element={<Weather />} />
          </Routes>
        </Router>
      </WeatherState>
    </>
  )
}

export default App