import React, { useContext, useEffect } from 'react'
import "./alert.css";
import WeatherContext from '../../context/WeatherContext';

const Alert = (props) => {
  const { showAlert, setShowAlert } = useContext(WeatherContext);
  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  }, [showAlert, setShowAlert]);

  return (
    <>
      <div className="alert">
        {props.text}
      </div>
    </>
  )
}

export default Alert