import React from 'react'
import "./hourlyForecastItem.css";

const HourlyForecastItem = (props) => {
  const { data } = props;
  return (
    <>
      <div className="hourly_forecast_item">
        <div className="hourly_forecast_item-time clr_a">{data.time}</div>
        <img src={data.icon} alt={data.text} />
        <div className="hourly_forecast_item-temp clr_f">{data.temperature}</div>
      </div>
    </>
  )
}

export default HourlyForecastItem