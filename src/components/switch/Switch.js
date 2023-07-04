import React from 'react'
import "./switch.css";

const Switch = (props) => {
  return (
    <>
      <div className={`toggle_switch ${props.type}`}>
        <label className="switch_lable">
          <input checked={props.check_condition} className="switch_checkbox" onChange={props.click} type='checkbox' />
          <span className="switch_slider"></span>
        </label>
      </div >
    </>
  )
}

Switch.defaultProps = {
  type: "default_switch",
};

export default Switch