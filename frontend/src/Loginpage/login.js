// components/LoginPage.js
import React, {useEffect, useState} from 'react';
import {login} from "../api";

import './login.css'
import logo2 from '../logo2.png'

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        try {
            typeof userInfo === 'string' && JSON.parse(userInfo);
            if (userInfo.email) {
                window.location.href = '/dashboard';
            }
        } catch (e) {
            localStorage.removeItem('userInfo');
        }

    })

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !password) {
    // Display a reminder if either the username or password is empty
    alert('Please enter both username and password');
    return;
  }
        console.log('Username:', username);
        console.log('Password:', password);
        login(username, password).then(res => {
            localStorage.setItem('userInfo', JSON.stringify(res.data));
            window.location.href = '/dashboard';
        });
    };

    return (

        <div className="login-page">
          <div className="logo-container">
             <img src={logo2} alt="Logo" className="logo2" /> {/* Add the logo */}
          </div>
         <div className="login-form">
        <div>
    
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            </div>
        </div>
        </div>
    );
}

export default LoginPage;
