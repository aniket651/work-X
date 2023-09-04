import React from "react";
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./AuthNavbar.css"
const AuthNavbar = () => {
    const navigate = useNavigate();


    const handleLoginClick = () => {
        localStorage.clear();
        navigate('/auth/login');
    }
    const handleRegisterClick = () => {
        localStorage.clear();
        navigate('/auth/register');
    }

    return (
        <React.Fragment>
            <nav>
                <div className="logo">WorkX</div>
                <input type="checkbox" id="click" />
                <label htmlFor="click" className="menu-btn">
                    <FontAwesomeIcon icon={faBars} className="icon" />
                    {/* <i class="fas fa-bars"></i>some change req here */}
                </label>
                <ul>
                    <li><a onClick={handleLoginClick}>Login </a></li>
                    <li><a onClick={handleRegisterClick}>Register </a></li>
                </ul>
            </nav>
        </React.Fragment>
    );
}
export default AuthNavbar;