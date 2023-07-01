import React, { useContext } from 'react'
import { Landing, Weather, Settings } from "./pages";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import WeatherState from './context/WeatherState';
import WeatherContext from './context/WeatherContext';
import { Alert, Loader } from './components';

const AppContent = () => {
  const { showAlert, showLoader, alertMsg } = useContext(WeatherContext);

  return (
    <>
      <Router>
        {
          showAlert && (<Alert text={alertMsg} />)
        }
        {
          showLoader && (<Loader />)
        }
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/weather" element={<Weather />} />
          <Route exact path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </>
  )
}

const App = () => {
  return (
    <>
      <WeatherState>
        <AppContent />
      </WeatherState>
    </>
  )
}


export default App