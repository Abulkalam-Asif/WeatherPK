import React, { useContext, useEffect } from 'react'
import "./settings.css";
import { Navbar } from '../../containers';
import { Switch } from '../../components';
import WeatherContext from '../../context/WeatherContext';

const Settings = () => {
  const { theme, setTheme, setShowLoader } = useContext(WeatherContext);
  const toggleTheme = () => {
    if (theme === "light_theme") {
      setTheme("dark_theme");
    } else {
      setTheme("light_theme");
    }
  }

  useEffect(() => {
    document.body.className = theme;
  }, [theme])

  useEffect(() => {
    setShowLoader(false);
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Navbar />
      <Switch click={toggleTheme} />
    </>
  )
}

export default Settings