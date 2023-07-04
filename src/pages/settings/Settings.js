import React, { useContext, useEffect } from 'react'
import "./settings.css";
import { Footer, Navbar } from '../../containers';
import { Switch } from '../../components';
import WeatherContext from '../../context/WeatherContext';

const Settings = () => {
  const { theme, setTheme, setShowLoader, units, setUnits } = useContext(WeatherContext);
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }
  const toggleWindSpeed = () => {
    const newSpeed = units.wind_speed === "kph" ? "mph" : "kph";
    setUnits({
      temperature: units.temperature,
      wind_speed: newSpeed
    })
    localStorage.setItem("units", JSON.stringify({ temperature: units?.temperature, wind_speed: newSpeed }));
  }
  const toggleTemperature = () => {
    const newTemp = units.temperature === "C" ? "F" : "C";
    setUnits({
      temperature: newTemp,
      wind_speed: units.wind_speed
    })
    localStorage.setItem("units", JSON.stringify({ temperature: newTemp, wind_speed: units?.wind_speed }));
  }

  useEffect(() => {
    setShowLoader(true);
    setShowLoader(false);
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <div className="settings_bg">
        <Navbar page="settings" />
        <div className="settings_main">
          <h1 className="settings_heading clr_p_high">Settings</h1>
          <div className="settings_options">
            <div className="settings-switch_div">
              <div className="settings-switch_text_div">
                <label className="clr_p_low">Theme: </label>
                <span className="clr_p_high settings-switch_text">{theme}</span>
              </div>
              <Switch click={toggleTheme} type="theme_switch" check_condition={theme === "dark"} />
            </div>
            <div className="settings-switch_div">
              <div className="settings-switch_text_div">
                <label className="clr_p_low">Temperature: </label>
                <span className="clr_p_high settings-switch_text">{units?.temperature === "C" ? "Celsius (C)" : "Fahrenheit (F)"}</span>
              </div>
              < Switch click={toggleTemperature} check_condition={units?.temperature === "F"} />
            </div>
            <div className="settings-switch_div">
              <div className="settings-switch_text_div">
                <label className="clr_p_low">Wind Speed: </label>
                <span className="clr_p_high settings-switch_text">{units?.wind_speed}</span>
              </div>
              < Switch click={toggleWindSpeed} check_condition={units?.wind_speed === "mph"} />
            </div>
          </div>
          <Footer margin_top="auto" page="settings" />
        </div>
      </div>
    </>
  )
}

export default Settings