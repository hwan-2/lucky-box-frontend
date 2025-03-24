import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul>
                <li><a href="/">메인</a></li>
                <li><a href="/expert">심화과정</a></li>
            </ul>
        </nav>
    );
};

export default Navbar
