// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const Navbar = ({ onPress }) => {
    const navbarStyle = {
        padding: '10px 20px',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 999,
    };

    const logoStyle = {
        color: 'white',
        fontSize: '1.5em',
        fontWeight: 'bold',
        textDecoration: 'none',
        marginLeft: '20px'
    };

    const navLinksStyle = {
        display: 'flex',
        gap: '20px',
        marginRight: '50px',
    };

    const linkStyle = {
        color: 'white',
        textDecoration: 'none',
        fontSize: '1em',
        fontWeight: 'bold',
        marginTop: '12px'
    };

    return (
        <nav style={navbarStyle}>
            <div>
                <Link to="/" style={logoStyle}>Green Credit</Link>
            </div>
            <div style={navLinksStyle}>
                <Link to="/" style={linkStyle}>Home</Link>
                <Link to="/blog" style={linkStyle}>Blog</Link>
                <Button text="Log In" onClick={onPress} />
            </div>
        </nav>
    );
};

export default Navbar;
