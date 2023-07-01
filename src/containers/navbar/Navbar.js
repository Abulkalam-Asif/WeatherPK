import "./navbar.css"
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { NavItem } from "../../components"
import { faSmog, faHome, faUserGear } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  let location = useLocation();
  useEffect(() => {
  }, [location]);
  return (
    <>
      <div className="nav_links">
        <NavItem link="/" active={location.pathname === "/" ? "active" : ""} icon={faHome} itemText="Home" />
        <NavItem link="/weather" active={location.pathname === "/weather" ? "active" : ""} icon={faSmog} itemText="Weather" />
        <NavItem link="/settings" active={location.pathname === "/settings" ? "active" : ""} icon={faUserGear} itemText="Settings" />
      </div>
    </>
  )
}

export default Navbar