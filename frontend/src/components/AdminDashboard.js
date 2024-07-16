import React, { useEffect, useState } from 'react';
import UserHeader from './UserHeader';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [selectedUserDetails, setSelectedUserDetails] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [remarks, setRemarks] = useState('');
    const { userId } = useParams();

    const pageStyle = {
        background: 'linear-gradient(to right, #20AE8E, #22C984)',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        color: 'white',
        textAlign: 'center',
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

    const tableStyle = {
        width: '80%',
        margin: '20px auto',
        borderCollapse: 'collapse',
        textAlign: 'left',
        backgroundColor: 'white',
        color: 'black',
        marginTop: '100px',
    };

    const buttonStyle = {
        padding: '5px 10px',
        margin: '0 5px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    };

    const modalStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        color: 'black',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        zIndex: 1000,
        width: '400px',
        maxHeight: '80vh',
        overflowY: 'auto',
    };

    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 999,
    };

    const closeButtonStyle = {
        backgroundColor: '#f44336',
        color: 'white',
        padding: '5px 10px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        float: 'right',
    };

    const detailStyle = {
        marginBottom: '10px',
    };

    const labelStyle = {
        fontWeight: 'bold',
    };

    const fetchProductuserDetails = async () => {
        try {
            const response = await axios.get('https://greencredit-rbw7.vercel.app/userproductdetails');
            if (response.data.status === 'ok') {
                setProducts(response.data.data);
            } else {
                console.error(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const fetchUserDetails = async (collectionName) => {
        try {
            const response = await axios.get(`https://greencredit-rbw7.vercel.app/userdetails/${collectionName}`);
            if (response.data.status === "ok") {
                setSelectedUserDetails(response.data.data[0]);
            } else {
                console.error(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    const handleApplicantClick = (applicantName) => {
        const collectionName = `user_${applicantName}`;
        fetchUserDetails(collectionName);
    };

    const handleUpdateStatus = async (objectId, applicantName, status) => {
        try {
            const date = new Date();
            const approvalDate = status === 'Approved' ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}` : null;
            const response = await axios.put('https://greencredit-rbw7.vercel.app/updateApplicationStatus', {
                objectId: objectId,
                applicantName: applicantName,
                applicationStatus: status,
                approvalDate: approvalDate,
                issuingAuthority: userId,
                remarks: remarks
            });
            if (response.data.status === 'ok') {
                fetchProductuserDetails();
            } else {
                console.error(response.data.data);
            }
        } catch (error) {
            console.error('Error updating application status:', error);
        }
    };
    const handleAccept = (objectId, applicantName) => {
        handleUpdateStatus(objectId, applicantName, 'Approved');
    };

    const handleReject = (objectId, applicantName) => {
        handleUpdateStatus(objectId, applicantName, 'Rejected');
    };

    const closeModal = () => {
        setSelectedUserDetails(null);
        setSelectedProduct(null);
    };

    useEffect(() => {
        fetchProductuserDetails();
    }, []);

    return (
        <div style={pageStyle}>
            <UserHeader style={{ background: '#0B6E4F' }} />
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>S.No</th>
                        <th style={thStyle}>Applicant Name</th>
                        <th style={thStyle}>Date of Application</th>
                        <th style={thStyle}>Project Description</th>
                        <th style={thStyle}>Credit Amount</th>
                        <th style={thStyle}>Accept/Reject</th>
                        <th style={thStyle}>Remarks</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product._id}>
                            <td style={tdStyle}>{index + 1}</td>
                            <td style={{ ...tdStyle, cursor: 'pointer', color: '#20AE8E' }} onClick={() => handleApplicantClick(product.applicantName)}>{product.applicantName}</td>
                            <td style={tdStyle}>{product.dateOfFiling}</td>
                            <td style={tdStyle}>{product.projectDescription}</td>
                            <td style={tdStyle}>{product.creditAmount}</td>
                            <td style={tdStyle}>
                                <button onClick={() => handleAccept(product._id, product.applicantName)} style={{ ...buttonStyle, fontWeight: 'bold', color: 'white', backgroundColor: '#0B6E4F' }}>Accept</button>
                                <button onClick={() => handleReject(product._id, product.applicantName)} style={{ ...buttonStyle, backgroundColor: 'red', color: 'white', fontWeight: 'bold' }}>Reject</button>
                            </td>
                            <td style={tdStyle}>
                                <button onClick={() => setSelectedProduct(product)} style={{ ...buttonStyle }}>Add Remarks</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedProduct && (
                <>
                    <div style={overlayStyle} onClick={closeModal}></div>
                    <div style={modalStyle}>
                        <h2 style={{ textAlign: 'center', marginBottom: '20px', marginLeft: '30px' }}>Add Remarks</h2>
                        <textarea
                            placeholder="Add remarks..."
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                            style={{ width: '85%', padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc', marginBottom: '10px' }}
                        ></textarea>
                        <div>
                            <button onClick={closeModal} style={{ ...buttonStyle, backgroundColor: '#0B6E4F', color: 'white', marginRight: '10px' }}>Submit Remarks</button>
                            <button onClick={closeModal} style={{ ...buttonStyle, backgroundColor: '#f44336', color: 'white' }}>Close</button>
                        </div>
                    </div>
                </>
            )}
            {selectedUserDetails && (
                <>
                    <div style={overlayStyle} onClick={closeModal}></div>
                    <div style={modalStyle}>
                        <button style={closeButtonStyle} onClick={closeModal}>Close</button>
                        <h2 style={{ textAlign: 'center', marginBottom: '20px', marginLeft: '60px' }}>User Details</h2>
                        <p style={detailStyle}><span style={labelStyle}>Name:</span> {selectedUserDetails.authperson}</p>
                        <p style={detailStyle}><span style={labelStyle}>Email:</span> {selectedUserDetails.email}</p>
                        <p style={detailStyle}><span style={labelStyle}>Phone:</span> {selectedUserDetails.connum}</p>
                        <p style={detailStyle}><span style={labelStyle}>Address:</span> {selectedUserDetails.addressName}</p>
                        <p style={detailStyle}><span style={labelStyle}>User Type:</span> {selectedUserDetails.userType}</p>
                        <p style={detailStyle}><span style={labelStyle}>Entity Name:</span> {selectedUserDetails.entityName}</p>
                        <p style={detailStyle}><span style={labelStyle}>Entity Type:</span> {selectedUserDetails.entitytype}</p>
                        <p style={detailStyle}><span style={labelStyle}>Aadhar Number:</span> {selectedUserDetails.aadhar}</p>
                        <p style={detailStyle}><span style={labelStyle}>Designation:</span> {selectedUserDetails.desig}</p>
                        <p style={detailStyle}><span style={labelStyle}>Uploaded Image:</span></p>
                        <img src={selectedUserDetails.image} alt="Id" style={{ width: '200px', height: '200px', marginLeft: 'auto', marginRight: 'auto', display: 'block', borderRadius: '8px' }} />
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminDashboard;


