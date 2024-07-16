import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChoicePage = () => {
    const navigate = useNavigate();
    const pageStyle = {
        background: 'linear-gradient(to right, #20AE8E, #22C984)',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
    };

    const headingStyle = {
        fontSize: '3em',
        marginBottom: '20px',
    };

    const buttonContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        marginTop: '20px',
    };

    const buttonStyle = {
        padding: '10px 20px',
        fontSize: '1em',
        backgroundColor: '#fff',
        color: '#22C984',
        border: '2px solid #22C984',
        borderRadius: '20px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, color 0.3s ease, width 0.3s ease, height 0.3s ease',
        outline: 'none',
        width: '200px',
        height: '100px',
        animation: 'popOut 0.5s ease',
    };

    const keyframesStyle = `
        @keyframes popOut {
            0% {
                transform: scale(0.5);
                opacity: 0;
            }
            100% {
                transform: scale(1);
                opacity: 1;
            }
        }
    `;

    const handleHover = (event) => {
        event.target.style.backgroundColor = '#66D6A2';
        event.target.style.color = '#fff';
        event.target.style.width = '220px';
        event.target.style.height = '120px';
    };

    const handleLeave = (event) => {
        event.target.style.backgroundColor = '#fff';
        event.target.style.color = '#22C984';
        event.target.style.width = '200px';
        event.target.style.height = '100px';
    };
    const handleUserSign = () => {
        navigate('/signup');
    };
    const handleAdmin = () => {
        navigate('/admin');
    };
    return (
        <div style={pageStyle}>
            <style>{keyframesStyle}</style>
            <h1 style={headingStyle}>Choose a Role</h1>
            <div style={buttonContainerStyle}>
                <button
                    style={buttonStyle}
                    onMouseEnter={handleHover}
                    onMouseLeave={handleLeave}
                    onClick={handleUserSign}
                >
                    User
                </button>
                <button
                    style={buttonStyle}
                    onMouseEnter={handleHover}
                    onMouseLeave={handleLeave}
                    onClick={handleAdmin}
                >
                    Administrator
                </button>
            </div>
        </div>
    );
};

export default ChoicePage;
