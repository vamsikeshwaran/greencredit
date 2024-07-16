import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const BlogHeader = ({ style, text, onPress }) => {
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
                <Link to="/" style={logoStyle}>Green Credit</Link>
            </div>
            <div style={navLinksStyle}>
                <Button text={text} onClick={onPress} />
            </div>
        </nav>
    );
};

export default BlogHeader;