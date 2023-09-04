import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import './PortalNavbar.css'

const Navbar = (props) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    localStorage.clear();
    navigate('/auth/login');
  }
  const handleRegisterClick = () => {
    localStorage.clear();
    navigate('/auth/register');
  }

  const handleDashboardClick = () => {
    // localStorage.clear();
        navigate('/auth/login');
  }
  const handleMyProjectsClick = () => {
    // localStorage.clear();
        navigate('/projects');
  }
  const handleMyTasksClick = () => {
    // localStorage.clear();
        navigate('/tasks');
  }



  return (
    <nav>
      <div className="logo">WorkX</div>
      <input type="checkbox" id="click" />
      <label htmlFor="click" className="menu-btn">
        <FontAwesomeIcon icon={faBars} className="icon"   />
        {/* <i class="fas fa-bars"></i>some change req here */}
      </label>
      <ul>
      {/* <li><a onClick={handleDashboardClick}>Dashboard </a></li> */}
        <li><a onClick={handleMyProjectsClick}>My Projects </a></li>
        <li><a onClick={handleMyTasksClick}>My Tasks </a></li>
        <li><a onClick={handleLogoutClick}>Logout </a></li>
        <li><a onClick={handleRegisterClick}>Register </a></li>
      </ul>

      {/* implement somehow that if person is logged in then only logout shows and vice-versa */}
    </nav>

  )
}

export default Navbar