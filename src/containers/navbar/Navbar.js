import "./navbar.css"
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { Navitem } from "../../components"
import { faSmog, faUserGear, faHouse } from '@fortawesome/free-solid-svg-icons';

const Navbar = (props) => {
  let location = useLocation();
  useEffect(() => {
  }, [location]);
  return (
    <>
      <div className={`navbar ${props.page}_navbar`}>
        <Navitem link="/" active={location.pathname === "/" ? "active" : ""} icon={faHouse} itemText="Home" />
        <Navitem link="/weather" active={location.pathname === "/weather" ? "active" : ""} icon={faSmog} itemText="Weather" />
        <Navitem link="/settings" active={location.pathname === "/settings" ? "active" : ""} icon={faUserGear} itemText="Settings" />
      </div>
    </>
  )
}

export default Navbar