import React from 'react'
import "./switch.css";

const Switch = (props) => {
  return (
    <>
      <div className="toggle_switch">
        <label className="switch_lable">
          <input className="switch_checkbox" onClick={props.click} type='checkbox' />
          <span className="switch_slider"></span>
        </label>
      </div >
    </>
  )
}

export default Switch