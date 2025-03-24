import React from 'react';
import Navbar from "./Navbar";
import './Navbar.css'

const Header = () => {
    return (
        <header>
            <div className="header-title">
                Lucky Box
            </div>
            <nav>
                <Navbar></Navbar>
            </nav>
        </header>
    );
};

export default Header
