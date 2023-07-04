import React from 'react'
import "./dailyForecastItem.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudRain, faSnowflake, faTemperatureHigh, faTemperatureLow } from '@fortawesome/free-solid-svg-icons';

const DailyForecastItem = (props) => {
  const { data } = props;
  return (
    <>
      <div className="daily_forecast_item">
        <div className="daily_forecast_item-day_date">
          <span className="daily_forecast_item-day clr_p_low">{data.day}</span>
          <span className="daily_forecast_item-date clr_p_medium">{data.date}</span>
        </div>
        <div className="daily_forecast_item-values_div">
          <div>
            <FontAwesomeIcon className="daily_forecast_item-icon clr_p_low" icon={faTemperatureHigh} />
            <span className="daily_forecast_item-value clr_p_high">{data.maxTemp}</span>
          </div>
          <div>
            <FontAwesomeIcon className="daily_forecast_item-icon clr_p_low" icon={faCloudRain} />
            <span className="daily_forecast_item-value clr_p_high">{data.rainChance}</span>
          </div>
          <div>
            <FontAwesomeIcon className="daily_forecast_item-icon clr_p_low" icon={faTemperatureLow} />
            <span className="daily_forecast_item-value clr_p_high">{data.minTemp}</span>
          </div>
          <div>
            <FontAwesomeIcon className="daily_forecast_item-icon clr_p_low" icon={faSnowflake} />
            <span className="daily_forecast_item-value clr_p_high">{data.snowChance}</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default DailyForecastItem