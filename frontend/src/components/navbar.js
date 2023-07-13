// components/Navbar.js
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import './navbar.css';
import logo from '../logo.png';

function Navbar() {
    const [userInfo, setUserInfo] = useState({});//[userInfo, setUserInfo

    useEffect(() => {
        let userInfo = localStorage.getItem('userInfo');

        try {
            userInfo = typeof userInfo === 'string' && JSON.parse(userInfo);
            if (userInfo.email) {
                setUserInfo(userInfo)
            }

        } catch (e) {
            localStorage.removeItem('userInfo');
        }
    }, [])

    return (
        <nav className="navbar">
            <img src={logo} alt="Logo" className="logo"/>
            <ul className="navbar-nav">
                <li className="nav-text">

                    Plant Management System
                </li>
                <li className="nav-item">
                    {userInfo.email && <Link to="/login" className="nav-link">
                        Profile
                    </Link>}
                </li>
                <li className="nav-item">
                    {userInfo.email ? <Link to="/logout" className="nav-link">
                        Logout
                    </Link> : <Link to="/login" className="nav-link">
                        Login
                    </Link>}
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
