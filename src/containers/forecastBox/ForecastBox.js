import React from 'react'
import "./forecastBox.css";

const ForecastBox = (props) => {
  const { direction, heading, dataItems } = props;
  return (
    <>
      <div className={`forecast_box forecast_box-${direction}`}>
        <h4 className="forecast_box-heading clr_p_medium">{heading}</h4>
        <div className={`forecast_box-items forecast_box-items-${direction}`}>
          {
            dataItems?.map((item, index) => <div key={index}>{item}</div>)
          }
        </div>
      </div>
    </>
  )
}

export default ForecastBox