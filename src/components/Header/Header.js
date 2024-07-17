import React from 'react';
import './Header.css';

function Header() {
    return (
        <header className="header">
            <img src="logo.png" alt="Logo" className="logo" />
            <nav>
                <button className="home-button">Home</button>
                <button className="new-video-button">Nuevo Video</button>
            </nav>
        </header>
    );
}

export default Header;
