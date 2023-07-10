// components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import logo from '../logo.png';

function Navbar() {
  return (
    <nav className="navbar">
    <img src={logo} alt="Logo" className="logo" />
      <ul className="navbar-nav">
       <li className="nav-item nav-text"> 
          Plant Management System
        </li>
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
