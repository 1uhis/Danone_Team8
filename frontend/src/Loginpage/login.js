// components/LoginPage.js
import React, {useEffect, useState} from 'react';
import {login} from "../api";

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
        // Add login logic here
        console.log('Username:', username);
        console.log('Password:', password);
        login(username, password).then(res => {
            localStorage.setItem('userInfo', JSON.stringify(res.data));
            window.location.href = '/dashboard';
        });
    };

    return (
        <div>
            <h1>Login</h1>
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
    );
}

export default LoginPage;
