import React, { useState, useEffect } from 'react';
import logo from './sample.png';
import Button from './Button';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
    const [displayedText, setDisplayedText] = useState('');
    const fullText = 'Green Credit Management System';
    const navigate = useNavigate();

    useEffect(() => {
        let index = 0;
        const intervalId = setInterval(() => {
            setDisplayedText(fullText.slice(0, index + 1));
            index++;
            if (index === fullText.length) {
                clearInterval(intervalId);
            }
        }, 100);
        return () => clearInterval(intervalId);
    }, []);

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

    const containerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        margin: '0 auto',
    };

    const textContainerStyle = {
        flex: '1',
        textAlign: 'left',
    };

    const headingStyle = {
        fontSize: '3em',
        marginRight: '20px',
    };

    const imageContainerStyle = {
        flex: '1',
        textAlign: 'right',
    };

    const imageStyle = {
        width: '800px',
        height: 'auto',
        marginRight: '-150px'
    };
    const paragraphStyle = {
        fontSize: '1em',
        lineHeight: '1.6',
        marginTop: '20px',
        textAlign: 'justify'
    };
    const buttonContainerStyle = {
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'center',
    };

    const handleGetStarted = () => {
        navigate('/choice');
    };
    const handlelogin = () => {
        navigate('/userlog');
    }

    return (
        <div style={pageStyle}>
            <Navbar onPress={handlelogin} />
            <div style={containerStyle}>
                <div style={textContainerStyle}>
                    <h1 style={headingStyle}>{displayedText}</h1>
                    <p style={paragraphStyle}>Welcome to Green Credit, where your financial choices make a positive impact on the planet. We believe in sustainable finance that supports eco-friendly initiatives and rewards responsible consumption. With our green credit options, you can contribute to a cleaner future while enjoying the financial benefits you deserve</p>
                    <div style={buttonContainerStyle}>
                        <Button text="Get Started" style={{ width: '260px' }} onClick={handleGetStarted} />
                        <Button text="Learn More" style={{ width: '260px' }} />
                    </div>
                </div>
                <div style={imageContainerStyle}>
                    <img src={logo} alt="Logo" style={imageStyle} />
                </div>
            </div>
        </div>
    );
};

export default MainPage;
