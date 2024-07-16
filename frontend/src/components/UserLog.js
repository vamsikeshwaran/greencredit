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

const UserLog = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [applicantName, setApplicantName] = useState('');
    const [password, setPassword] = useState('');
    const collectionName = `user_${applicantName}`;

    const fetchUserDetails = async (collectionName) => {
        try {
            const response = await axios.get(`http://localhost:5001/userdetails/${collectionName}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching user details:", error);
            return null;
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const data = await fetchUserDetails(collectionName);
        if (data && data.status === "ok") {
            const user = data.data[0];
            if (user.email === email && user.password === password) {
                navigate(`/userdashboard/${user.authperson}`);
            } else {
                alert('Invalid login');
            }
        } else {
            alert('Invalid login');
        }
    };

    return (
        <div style={pageStyle}>
            <div style={formContainerStyle}>
                <h1 style={{ color: '#22C984', textAlign: 'center' }}>User Log In</h1>
                <form onSubmit={handleLogin} style={{ width: '100%' }}>
                    <div style={formGroupStyle}>
                        <label style={labelStyle}>Email</label>
                        <input
                            type="text"
                            style={inputStyle}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div style={formGroupStyle}>
                        <label style={labelStyle}>Applicant Name</label>
                        <input
                            type="text"
                            style={inputStyle}
                            value={applicantName}
                            onChange={(e) => setApplicantName(e.target.value)}
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
                        <button type="submit" style={buttonStyle} onClick={handleLogin}>Log In</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserLog;

