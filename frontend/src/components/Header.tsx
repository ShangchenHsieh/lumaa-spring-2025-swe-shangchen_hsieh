import React from 'react';
import './Component.css';

const Header = () => {
    return (
        <header style={{ borderTopLeftRadius: "5px", borderTopRightRadius: "5px" }}>
            <div className="logo">Lumaa</div>
            <nav>
                <a href="/">Register</a>
                <a href="/login">Login</a>
            </nav>
        </header>
    );
};

export default Header;
