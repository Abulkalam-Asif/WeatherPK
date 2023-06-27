import React, { useContext, useEffect, useRef } from 'react'
import "./landing.css"
import WeatherContext from "../../context/WeatherContext";
import landing_bg from "../../assets/landing_bg.mp4"
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const context = useContext(WeatherContext);
  const { cityName, setCityName, setData, setAlertMsg, setShowAlert, getCityWeatherData, setShowLoader } = context;
  const navigate = useNavigate(null);

  const isComponentMounted = useRef(true);
  useEffect(() => {
    if (isComponentMounted.current) {
      setShowLoader(false);
      isComponentMounted.current = false;
    }
  }, []);

  const handleData = async () => {
    const fetchedData = await getCityWeatherData();
    if (fetchedData.error) {
      setShowLoader(false);
      setShowAlert(true);
      let alertContent = fetchedData.error.message;
      if (alertContent.localeCompare("Parameter q is missing.") === 0) {
        alertContent = "Please Enter a City Name.";
      }
      setAlertMsg(alertContent);
      setCityName("");
    } else {
      localStorage.setItem("cityName", cityName);
      setData(fetchedData);
      navigate("/weather");
    }
  };
  const searchInputHandler = (e) => {
    setCityName(e.target.value);
  };
  const searchHandler = () => {
    setShowLoader(true);
    handleData();
  };
  useEffect(() => {
    if (localStorage.getItem("cityName")) {
      setCityName(localStorage.getItem("cityName"));
    }
  }, [setCityName])

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
          <button className="landing_search_btn" onClick={searchHandler}>Search</button>
        </div>
      </div >
    </>
  )
}

export default Landing