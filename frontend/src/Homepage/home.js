// components/HomePage.js
import React from 'react';
import Navbar from '../components/navbar';
import './home.css'; 

function HomePage() {
  return (
    <div>
      <Navbar />
      <h1 className="title" >Welcome to the plant management system</h1>
    </div>
  );
}

export default HomePage;

