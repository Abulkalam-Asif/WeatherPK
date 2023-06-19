import { useState } from "react";
import WeatherContext from "./WeatherContext";

const WeatherState = (props) => {
  const [cityName, setCityName] = useState("");
  const api_key = "e26ce4ecbf37461f9de54842231706";
  const base_url = "http://api.weatherapi.com/v1/";

  return (
    <WeatherContext.Provider value={{ cityName, setCityName, api_key, base_url }}>
      {props.children}
    </WeatherContext.Provider>
  )
}

export default WeatherState;