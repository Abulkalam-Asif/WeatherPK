import React, { useContext } from 'react'
import "./landing.css"
import { Link } from 'react-router-dom';
import WeatherContext from "../../context/WeatherContext";
import landing_bg from "../../assets/landing_bg.mp4"

const Landing = () => {

  const context = useContext(WeatherContext);
  const { cityName, setCityName } = context;

  const searchInputHandler = (e) => {
    setCityName(e.target.value);
  };
  return (
    <>
      <video id="landing_bg" autoPlay muted loop>
        <source src={landing_bg} type="video/mp4" />
      </video>
      <div className="landing">
        <div className="landing_text">
          <h1 className="landing_logo">WeatherPK</h1>
          <h2 className="landing_tagline">Live Weather and Forcast</h2>
        </div>
        <div className="landing_search">
          <input type="search" name="search" id="landing_search_field" placeholder="Search for a city name" onChange={searchInputHandler} value={cityName} />
          <Link to="/weather" className="landing_search_btn">Search</Link>
        </div>
      </div >
    </>
  )
}

export default Landing