import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const pageStyle = {
    background: 'linear-gradient(to right, #20AE8E, #22C984)',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    position: 'relative',
};

const formContainerStyle = {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '40px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    width: '500px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
};

const formGroupStyle = {
    width: '475px',
    marginBottom: '20px',
    height: '70px'
};

const labelStyle = {
    color: 'black',
    marginBottom: '5px',
    display: 'block',
    fontSize: '18px'
};

const inputStyle = {
    padding: '10px',
    fontSize: '16px',
    width: '100%',
    borderRadius: '5px',
    border: '1px solid #ccc',
};

const buttonStyle = {
    backgroundColor: '#22C984',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    border: 'none',
    fontSize: '16px',
    marginTop: '20px'
};

const Admin = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');
    const [departmentCode, setDepartmentCode] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('http://localhost:5001/adminlogin', {
                params: {
                    userId,
                    departmentCode,
                    password
                }
            });

            if (response.data.status === 'ok') {
                navigate(`/admindashboard/${userId}`);
            } else {
                alert('Invalid login: ' + response.data.data);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Error logging in. Please try again.');
        }
    };

    return (
        <div style={pageStyle}>
            <div style={formContainerStyle}>
                <h1 style={{ color: '#22C984', textAlign: 'center' }}>Admin Log In</h1>
                <form onSubmit={handleLogin} style={{ width: '100%' }}>
                    <div style={formGroupStyle}>
                        <label style={labelStyle}>User ID</label>
                        <input
                            type="text"
                            style={inputStyle}
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                    </div>
                    <div style={formGroupStyle}>
                        <label style={labelStyle}>Unique Department Code</label>
                        <input
                            type="text"
                            style={inputStyle}
                            value={departmentCode}
                            onChange={(e) => setDepartmentCode(e.target.value)}
                        />
                    </div>
                    <div style={formGroupStyle}>
                        <label style={labelStyle}>Password</label>
                        <input
                            type="password"
                            style={inputStyle}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div style={{ textAlign: 'center', width: '100%' }}>
                        <button type="submit" style={buttonStyle}>Log In</button>
                    </div>
                </form>
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <p style={{ color: 'black' }}>Do not have a Account <a href="/adminsignup" style={{ color: '#22C984' }}>Sign Up </a>?</p>
                </div>
            </div>
        </div>
    );
};

export default Admin;


