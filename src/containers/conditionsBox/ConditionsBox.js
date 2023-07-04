import React from 'react'
import "./conditionsBox.css";
import { ConditionsItem } from '../../components';

const ConditionsBox = (props) => {
  const { heading, dataItems } = props;
  return (
    <>
      <div className="conditions_box">
        <h4 className="conditions_box-heading clr_p_medium">{heading}</h4>
        <div className="conditions_box-items">
          {
            dataItems?.map((item, index) => (
              <ConditionsItem key={index} field={item.field} icon={item.icon} value={item.value} />
            ))
          }
        </div>
      </div>
    </>
  )
}

export default ConditionsBox