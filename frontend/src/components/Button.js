import React, { useState } from 'react';

const Button = ({ text, onClick, style }) => {
    const [hovered, setHovered] = useState(false);

    const buttonStyle = {
        padding: '10px 20px',
        fontSize: '1em',
        backgroundColor: hovered ? '#22C984' : '#fff',
        color: hovered ? '#fff' : '#22C984',
        border: '2px solid #22C984',
        borderRadius: '20px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, color 0.3s ease',
        outline: 'none',
        marginRight: '10px',
    };
    const mergedStyle = {
        ...buttonStyle,
        ...style,
    };

    const handleHover = () => {
        setHovered(true);
    };

    const handleLeave = () => {
        setHovered(false);
    };

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <button
            style={mergedStyle}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            onClick={handleClick}
        >
            {text}
        </button>
    );
};

export default Button;
