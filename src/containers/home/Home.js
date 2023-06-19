import React, { useContext } from "react"
import "./home.css"
import WeatherContext from "../../context/WeatherContext";

const Home = () => {
  const context = useContext(WeatherContext);
  const { cityName } = context;

  return (
    <>
      <div>{cityName}</div>
    </>
  )
}

export default Home