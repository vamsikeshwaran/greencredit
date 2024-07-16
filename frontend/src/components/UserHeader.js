import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import { IoMdList } from "react-icons/io";

const UserHeader = ({ style, onPress }) => {
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
    const mergedStyle = {
        ...navbarStyle,
        ...style,
    };

    return (
        <nav style={mergedStyle}>
            <div>
                <IoMdList onClick={onPress} />
                <Link to="/" style={logoStyle}>Green Credit</Link>
            </div>
            <div style={navLinksStyle}>
                <Button text="Log Out" onClick={() => navigate('/')} />
            </div>
        </nav>
    );
};

export default UserHeader;