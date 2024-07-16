import React, { useState, useEffect } from 'react';
import UserHeader from './UserHeader';
import Button from './Button';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useParams } from 'react-router-dom';
import axios from 'axios';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const pageStyle = {
    background: 'linear-gradient(to right, #20AE8E, #22C984)',
    height: '900px',
    display: 'flex',
    flexDirection: 'column',
    color: 'white',
    textAlign: 'center',
    position: 'relative',
};

const lineStyle = {
    backgroundColor: 'grey',
    height: '1px',
    width: '94%',
    marginTop: '22px',
    marginLeft: '40px',
};

const gradientBoxStyle = {
    width: '200px',
    height: '100px',
    background: 'linear-gradient(to bottom, white, #d3d3d3)',
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '20px',
    padding: '10px',
};

const chartContainerStyle = {
    width: '600px',
    height: '400px',
    marginTop: '50px',
};

const chartContainerStyles = {
    width: '850px',
    height: '400px',
    marginTop: '50px',
};

const sidenavStyle = {
    height: '100%',
    width: '250px',
    position: 'fixed',
    zIndex: 1,
    top: 0,
    left: 0,
    backgroundColor: '#0B6E4F',
    overflowX: 'hidden',
    paddingTop: '20px',
};

const sidenavLinkStyle = {
    padding: '8px 8px 8px 16px',
    textDecoration: 'none',
    fontSize: '25px',
    color: 'white',
    display: 'block',
};

const tableStyle = {
    width: '80%',
    margin: '20px auto',
    borderCollapse: 'collapse',
    textAlign: 'left',
    backgroundColor: 'white',
    color: 'black',
    marginTop: '100px',
};

const thStyle = {
    backgroundColor: '#0B6E4F',
    color: 'white',
    padding: '10px',
};

const tdStyle = {
    padding: '10px',
    borderBottom: '1px solid #ddd',
};

const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
};

const modalStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '500px',
    zIndex: 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '470px'
};

const inputStyle = {
    marginBottom: '10px',
    padding: '8px',
    width: '90%',
    borderRadius: '4px',
    border: '1px solid #ccc',
};
const profileContainerStyle = {
    width: '80%',
    margin: '20px auto',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: 'white',
    color: 'black',
    textAlign: 'left',
    marginTop: '100px'
};

const profileHeaderStyle = {
    borderBottom: '2px solid #0B6E4F',
    paddingBottom: '10px',
    marginBottom: '20px',
};

const profileDetailStyle = {
    marginBottom: '10px',
};

const UserDashboard = () => {
    const [nav, setnav] = useState(false);
    const [visibleSection, setVisibleSection] = useState('#dashboard');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [userDetails, setUserDetails] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        date: new Date().toISOString().split('T')[0],
        project: '',
        amount: '',
        status: '',
        approvalDate: '',
        authority: '',
        remarks: '',
    });
    const { name } = useParams();

    const getSidenavLinkStyle = (section) => ({
        padding: '8px 8px 8px 16px',
        textDecoration: 'none',
        fontSize: '25px',
        color: 'white',
        display: 'block',
        backgroundColor: visibleSection === section ? '#20AE8E' : 'transparent',
    });
    const collectionName = `user_${name}`

    useEffect(() => {
        if (collectionName) {
            fetchUserDetails(collectionName);
            fetchProductDetails(collectionName);
        }
    }, [collectionName]);

    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'module';
        script.src = 'https://agent.d-id.com/v1/index.js';
        script.dataset.name = 'did-agent';
        script.dataset.mode = 'fabio';
        script.dataset.clientKey = 'Z29vZ2xlLW9hdXRoMnwxMDcwMzI2ODI1NDE0MjA2OTY5NTk6U1lNaDlxaVpqN21YbXAxdlU1N0NN';
        script.dataset.agentId = 'agt_n9Aa-s8W';
        script.dataset.monitor = 'true';

        script.onload = () => {
            console.log('DID script loaded successfully.');
        };

        script.onerror = (error) => {
            console.error('Failed to load the DID script:', error);
        };

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const fetchUserDetails = async (collectionName) => {
        try {
            const response = await axios.get(`https://greencredit-rbw7.vercel.app/userdetails/${collectionName}`);
            if (response.data.status === "ok") {
                console.log(response.data.data[0].authperson);
                setUserDetails(response.data.data[0]);
            } else {
                console.error(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };
    const fetchProductDetails = async (collectionName) => {
        try {
            const response = await axios.get(`https://greencredit-rbw7.vercel.app/productdetails/${collectionName}`);
            if (response.data.status === "ok") {
                setProducts(response.data.data);
                console.log(response.data.data[0].remarks)
            } else {
                console.error(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    const approvedProductsCount = products.filter(product => product.applicationStatus === 'Approved').length;
    const RejectedProductsCount = products.filter(product => product.applicationStatus === 'Rejected').length;
    const sentapplication = products.length
    const data = {
        labels: ['land', 'accept', 'reject', 'sent'],
        datasets: [
            {
                label: 'Responses',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [approvedProductsCount, approvedProductsCount, RejectedProductsCount, sentapplication],
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Count',
                },
                position: 'left',
                beginAtZero: true,
            },
        },
    };

    const data1 = {
        labels: ['land', 'accept', 'reject', 'sent'],
        datasets: [
            {
                label: 'Responses',
                backgroundColor: ['lightblue', 'grey', 'red', 'white'],
                data: [approvedProductsCount, approvedProductsCount, RejectedProductsCount, sentapplication],
            },
        ],
    };

    const options1 = {
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
        },
    };

    const handlesidenav = () => {
        setnav(!nav);
    };

    const handleNavigation = (section) => {
        setVisibleSection(section);
    };
    const handleCreateApplication = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = async () => {
        const userData = {
            identifier: "Product",
            applicantName: formData.name,
            dateOfFiling: formData.date,
            projectDescription: formData.project,
            creditAmount: formData.amount,
            applicationStatus: 'Pending'

        };

        try {
            const response = await axios.post('https://greencredit-rbw7.vercel.app/createapplication', userData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.data.status === "ok") {
                setIsModalOpen(false);
                setFormData({
                    name: '',
                    date: new Date().toISOString().split('T')[0],
                    project: '',
                    amount: '',
                    status: '',
                    approvalDate: '',
                    authority: '',
                    remarks: '',
                });
                fetchProductDetails(collectionName)
            } else {
                console.log(response.data);
            }
        } catch (error) {
            console.error('There was an error registering the user!', error);
        }
    };
    return (
        <>
            <div style={pageStyle}>
                {isModalOpen && <div style={modalOverlayStyle} onClick={handleCloseModal} />}
                <UserHeader style={{ background: '#0B6E4F' }} onPress={handlesidenav} />
                {nav && (
                    <div style={sidenavStyle}>
                        <a href="#home" style={sidenavLinkStyle}>Home</a>
                        <a href="#dashboard" style={getSidenavLinkStyle('#dashboard')} onClick={() => handleNavigation('#dashboard')}>Dashboard</a>
                        <a href="#application" style={getSidenavLinkStyle('#application')} onClick={() => handleNavigation('#application')}>Application</a>
                        <a href="#profile" style={getSidenavLinkStyle('#profile')} onClick={() => handleNavigation('#profile')}>Profile</a>
                    </div>
                )}
                {visibleSection === '#dashboard' && (
                    <div id='#dashboard'>
                        <div style={{ display: 'flex', marginTop: '120px', marginLeft: '40px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px', marginTop: '8px' }}>
                                <h2 style={{ marginTop: '-2px' }}>Welcome</h2>
                                <h3 style={{ marginTop: '-6px' }}>{name}</h3>
                            </div>
                            <Button text="+ Create an application" style={{ height: '45px', marginLeft: '980px', marginTop: '18px' }} onClick={handleCreateApplication} />
                        </div>
                        <div style={{ ...lineStyle }} />
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '70px', marginLeft: '40px' }}>
                            <div style={gradientBoxStyle}>
                                <p style={{ color: '#20AE8E', fontWeight: 'bold', textAlign: 'initial', marginBottom: '70px' }}>Number of Land Allocated</p>
                                <p style={{ color: '#20AE8E', textAlign: 'center', fontSize: '60px' }}>{products.filter(product => product.applicationStatus === 'Approved').length}</p>
                            </div>
                            <div style={gradientBoxStyle}>
                                <p style={{ color: '#20AE8E', fontWeight: 'bold', textAlign: 'initial', marginBottom: '90px', marginRight: '35px' }}>Application Sent</p>
                                <p style={{ color: '#20AE8E', textAlign: 'center', fontSize: '60px' }}>{products.length}</p>
                            </div>
                            <div style={gradientBoxStyle}>
                                <p style={{ color: '#20AE8E', fontWeight: 'bold', textAlign: 'initial', marginBottom: '70px', marginRight: '60px' }}>Application Accepted</p>
                                <p style={{ color: '#20AE8E', textAlign: 'center', fontSize: '60px' }}>{products.filter(product => product.applicationStatus === 'Approved').length}</p>
                            </div>
                            <div style={gradientBoxStyle}>
                                <p style={{ color: '#20AE8E', fontWeight: 'bold', textAlign: 'initial', marginBottom: '70px', marginRight: '35px' }}>Application Rejected</p>
                                <p style={{ color: '#20AE8E', textAlign: 'center', fontSize: '60px' }}>{products.filter(product => product.applicationStatus === 'Rejected').length}</p>
                            </div>
                            <div style={gradientBoxStyle}>
                                <p style={{ color: '#20AE8E', fontWeight: 'bold', textAlign: 'initial', marginBottom: '70px', marginRight: '18px' }}>Credits Allocated</p>
                                <p style={{ color: '#20AE8E', textAlign: 'center', fontSize: '60px' }}>{products.filter(product => product.applicationStatus === 'Approved').reduce((sum, product) => sum + parseInt(product.creditAmount), 0)}</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '190px', marginLeft: '25px' }}>
                            <div style={chartContainerStyles}>
                                <Bar data={data} options={options} />
                            </div>
                            <div style={chartContainerStyle}>
                                <Pie data={data1} options={options1} style={{ height: '500px', width: '500px' }} />
                            </div>
                        </div>
                    </div>
                )}
                {visibleSection === '#application' && (
                    <div id='#application'>
                        <h1 style={{ marginTop: '100px', marginRight: '1000px' }}>Applications</h1>
                        <div style={{ marginTop: '-60px', marginLeft: '1000px' }}>
                            <Button text="Download Report" />
                        </div>
                        <div style={{ ...lineStyle, marginBottom: '-50px', width: '1190px', marginLeft: '138px' }}></div>
                        <table style={tableStyle}>
                            <thead>
                                <tr>
                                    <th style={thStyle}>S.No</th>
                                    <th style={thStyle}>Applicant Name</th>
                                    <th style={thStyle}>Date of Application</th>
                                    <th style={thStyle}>Project Description</th>
                                    <th style={thStyle}>Credit Amount</th>
                                    <th style={thStyle}>Application Status</th>
                                    <th style={thStyle}>Approval Date</th>
                                    <th style={thStyle}>Issuing Authority</th>
                                    <th style={thStyle}>Remarks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={product._id}>
                                        <td style={tdStyle}>{index + 1}</td>
                                        <td style={tdStyle}>{product.applicantName}</td>
                                        <td style={tdStyle}>{product.dateOfFiling}</td>
                                        <td style={tdStyle}>{product.projectDescription}</td>
                                        <td style={tdStyle}>{product.creditAmount}</td>
                                        <td style={tdStyle}>{product.applicationStatus}</td>
                                        {product.approvalDate === null ? <td style={tdStyle}>-</td> : <td style={tdStyle}>{product.approvalDate}</td>}
                                        {product.issuingAuthority === null ? <td style={tdStyle}>-</td> : <td style={tdStyle}>{product.issuingAuthority}</td>}
                                        {product.remarks === null ? <td style={tdStyle}>-</td> : <td style={tdStyle}>{product.remarks}</td>}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {isModalOpen && (
                    <div style={modalOverlayStyle}>
                        <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                            <h2 style={{ color: '#0B6E4F' }}>Create an Application</h2>
                            <h4 style={{ color: '#0B6E4F', marginRight: '340px', marginBottom: '10px' }}>Applicant Name</h4>
                            <input
                                style={inputStyle}
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Applicant Name"
                            />
                            <h4 style={{ color: '#0B6E4F', marginRight: '364px', marginBottom: '10px', marginTop: '5px' }}>Date of filing</h4>
                            <input
                                style={inputStyle}
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                placeholder="Date of Application"
                                max={formData.date}
                            />
                            <h4 style={{ color: '#0B6E4F', marginRight: '310px', marginBottom: '10px', marginTop: '5px' }}>Project Description</h4>
                            <input
                                style={inputStyle}
                                type="text"
                                name="project"
                                value={formData.project}
                                onChange={handleInputChange}
                                placeholder="Project Description"
                            />
                            <h4 style={{ color: '#0B6E4F', marginRight: '347px', marginBottom: '10px', marginTop: '5px' }}>Credit Amount</h4>
                            <input
                                style={inputStyle}
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleInputChange}
                                placeholder="Credit Amount"
                            />
                            <div style={{ display: 'flex', gap: '250px' }}>
                                <Button text="Submit" style={{ marginTop: '20px' }} onClick={handleSubmit} />
                                <Button text="Close" onClick={handleCloseModal} style={{ marginTop: '20px' }} />
                            </div>
                        </div>
                    </div>
                )}
                {visibleSection === '#profile' && (
                    <div style={profileContainerStyle}>
                        <h2 style={profileHeaderStyle}>User Profile</h2>
                        <div style={profileDetailStyle}><strong>Name:</strong> {userDetails.authperson}</div>
                        <div style={profileDetailStyle}><strong>Email:</strong> {userDetails.email}</div>
                        <div style={profileDetailStyle}><strong>Phone:</strong> {userDetails.connum}</div>
                        <div style={profileDetailStyle}><strong>Address:</strong> {userDetails.addressName}</div>
                        <div style={profileDetailStyle}><strong>User Type:</strong> {userDetails.userType}</div>
                        <div style={profileDetailStyle}><strong>Entity Name:</strong> {userDetails.entityName}</div>
                        <div style={profileDetailStyle}><strong>Entity Type:</strong> {userDetails.entitytype}</div>
                        <div style={profileDetailStyle}><strong>Aadhar Number:</strong> {userDetails.aadhar}</div>
                        <div style={profileDetailStyle}><strong>Designation:</strong> {userDetails.desig}</div>
                        <div style={profileDetailStyle}><strong>Uploaded Image:</strong></div>
                        <img src={userDetails.image} alt="Id" style={{ width: '200px', height: '200px', marginLeft: '120px' }} />
                    </div>
                )}
            </div>
        </>
    );
};

export default UserDashboard;


