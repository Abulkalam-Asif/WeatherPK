import React from 'react'
import "./conditionsItem.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ConditionsItem = (props) => {
  const { field, icon, value } = props;
  return (
    <>
      <div className="condition">
        <div className="condition-icon_box">
          <FontAwesomeIcon className="condition-icon clr_a" icon={icon} />
          <h4 className="condition-field clr_a">{field}</h4>
        </div>
        <div className="condition-text_box">
          <h3 className="condition-data clr_f">{value}</h3>
        </div>
      </div>
    </>
  )
}

export default ConditionsItem