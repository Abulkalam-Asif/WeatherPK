import React from 'react'
import "./navitem.css"
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navitem = (props) => {
  return (
    <>
      <Link to={props.link} className={`nav_item ${props.active}`}>
        <FontAwesomeIcon className="nav_item-icon" icon={props.icon} />
        <span className="nav_item-text">{props.itemText}</span>
      </Link>
    </>
  )
}

export default Navitem