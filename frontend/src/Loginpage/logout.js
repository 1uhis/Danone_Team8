// components/LoginPage.js
import React, {useEffect, useState} from 'react';
import {login} from "../api";

function LogoutPage() {

    useEffect(() => {
        localStorage.setItem('userInfo', JSON.stringify({}))
        localStorage.removeItem('userInfo');
        window.location.href = '/login';
    },[])

    return (
        <div>

        </div>
    );
}

export default LogoutPage;
