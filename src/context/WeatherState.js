import { useState } from "react";
import WeatherContext from "./WeatherContext";

const WeatherState = (props) => {
  const [cityName, setCityName] = useState("");
  const [data, setData] = useState(null);
  const api_key = "e26ce4ecbf37461f9de54842231706";
  const base_url = "https://api.weatherapi.com/v1/";
  const no_of_days = 3;

  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [showLoader, setShowLoader] = useState(true);
  const [theme, setTheme] = useState("light");
  const [units, setUnits] = useState({ temperature: "C", wind_speed: "kph" });

  const getCityWeatherData = async (city_name = cityName) => {
    const response = await fetch(`${base_url}forecast.json?key=${api_key}&q=${city_name}&days=${no_of_days}&aqi=no&alerts=no`);
    const json = await response.json();
    return json;
  }

  return (
    <WeatherContext.Provider value={{ cityName, setCityName, data, setData, showAlert, setShowAlert, alertMsg, setAlertMsg, getCityWeatherData, showLoader, setShowLoader, base_url, api_key, no_of_days, theme, setTheme, units, setUnits }}>
      {props.children}
    </WeatherContext.Provider>
  )
}

export default WeatherState;