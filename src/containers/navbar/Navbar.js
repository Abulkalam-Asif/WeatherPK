import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import "./navbar.css"
import { Navitem } from "../../components"
import { faSmog, faHome } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  let location = useLocation();
  useEffect(() => {
  }, [location]);
  return (
    <>
      <div className="nav_links">
        <Navitem link="/weather" active={location.pathname === "/weather" ? "active" : ""} icon={faSmog} itemText="Weather" />
        <Navitem link="/" active={location.pathname === "/" ? "active" : ""} icon={faHome} itemText="Home" />
      </div>
    </>
  )
}

export default Navbar