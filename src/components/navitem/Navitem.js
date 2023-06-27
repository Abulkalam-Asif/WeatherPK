import React from 'react'
import "./navItem.css"
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavItem = (props) => {
  return (
    <>
      <Link to={props.link} className={`nav_item ${props.active}`}>
        <FontAwesomeIcon className="nav_item-icon" icon={props.icon} />
        <span className="nav_item-text">{props.itemText}</span>
      </Link>
    </>
  )
}

export default NavItem