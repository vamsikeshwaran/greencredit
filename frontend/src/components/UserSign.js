import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAsGayhEtgleRGsDCme40wu8Z0d-F3yApI",
    authDomain: "videoai-a83c6.firebaseapp.com",
    projectId: "videoai-a83c6",
    storageBucket: "videoai-a83c6.appspot.com",
    messagingSenderId: "1074917851230",
    appId: "1:1074917851230:web:f2f54dc1e509e71a84f4cf",
    measurementId: "G-4QPLKQX4YQ"
}
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

const pageStyle = {
    background: 'linear-gradient(to right, #20AE8E, #22C984)',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'white',
    position: 'relative',
};

const circleContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
    width: '70%',
    marginTop: '70px',
};

const circleStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '20px',
    fontWeight: 'bold',
    backgroundColor: '#fff',
    color: '#22C984',
    position: 'relative',
    zIndex: 1,
};

const lineStyle = {
    backgroundColor: '#184632',
    height: '5px',
    width: '510px',
    marginTop: '22px',
};

const buttonContainerStyle = {
    position: 'absolute',
    bottom: '50px',
    right: '210px',
};
const backContainerStyle = {
    position: 'absolute',
    bottom: '50px',
    right: '1190px',
}

const UserSign = () => {
    const navigate = useNavigate();
    const [selectedCircle, setSelectedCircle] = useState(1);
    const [userType, setUserType] = useState("");
    const [entityName, setEntityName] = useState("");
    const [addressName, setaddressName] = useState("");
    const [password, setpassword] = useState("");
    const [entitytype, setentitytype] = useState("");
    const [aadhar, setaadhar] = useState("");
    const [authperson, setauthperson] = useState("");
    const [desig, setdesig] = useState("");
    const [connum, setconnum] = useState("");
    const [email, setemail] = useState("");
    const [preview, setPreview] = useState(null);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageurl, setimageurl] = useState("");

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
        const storageRef = storage.ref();
        const fileRef = storageRef.child(file.name);
        try {
            await fileRef.put(file);
            const downloadURL = await fileRef.getDownloadURL();
            setimageurl(downloadURL)
            console.log('File uploaded successfully');
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('image', selectedFile);
    };
    const handleCheckboxChange = () => {
        setAgreeTerms(!agreeTerms);
    };
    const handleNextClick = () => {
        setSelectedCircle((prev) => (prev + 1));
    };
    const handleBackClick = () => {
        setSelectedCircle((prev) => (prev - 1));
        console.log(preview);
    };
    const handleFinishClick = async (event) => {
        event.preventDefault();

        const userData = {
            identifier: "User",
            userType: userType,
            entityName: entityName,
            addressName: addressName,
            password: password,
            entitytype: entitytype,
            aadhar: aadhar,
            authperson: authperson,
            desig: desig,
            connum: connum,
            email: email,
            image: imageurl,
            agreeTerms: agreeTerms
        };

        try {
            const response = await axios.post('https://greencredit-rbw7.vercel.app/register', userData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.data.status === "ok") {
                navigate(`/userdashboard/${authperson}`);
            } else {
                console.log(response.data);
            }
        } catch (error) {
            console.error('There was an error registering the user!', error);
        }
    };



    return (
        <div style={pageStyle}>
            <h1>User Registration</h1>
            <div style={circleContainerStyle}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ ...circleStyle, backgroundColor: selectedCircle >= 1 ? '#3B82F6' : '#fff', color: selectedCircle >= 1 ? 'white' : '#22C984' }}>1</div>
                    <p>User Details</p>
                </div>
                <div style={{ ...lineStyle }} />
                <div style={{ textAlign: 'center' }}>
                    <div style={{ ...circleStyle, backgroundColor: selectedCircle >= 2 ? '#3B82F6' : '#fff', color: selectedCircle >= 2 ? 'white' : '#22C984' }}>2</div>
                    <p>Entity Details</p>
                </div>
                <div style={{ ...lineStyle }} />
                <div style={{ textAlign: 'center' }}>
                    <div style={{ ...circleStyle, backgroundColor: selectedCircle >= 3 ? '#3B82F6' : '#fff', color: selectedCircle >= 3 ? 'white' : '#22C984' }}>3</div>
                    <p>ID Details</p>
                </div>
                <div style={{ ...lineStyle }} />
                <div style={{ textAlign: 'center' }}>
                    <div style={{ ...circleStyle, backgroundColor: selectedCircle >= 4 ? '#3B82F6' : '#fff', color: selectedCircle >= 4 ? 'white' : '#22C984' }}>4</div>
                    <p>Contact Details</p>
                </div>
            </div>
            <div style={{ height: '380px', width: '1000px', backgroundColor: 'white', borderRadius: '10px', borderColor: 'grey', borderWidth: '2px', borderStyle: 'solid' }}>
                {selectedCircle === 1 && (
                    <div>
                        <div style={{ backgroundColor: '#f6f6f6', display: 'flex' }}>
                            <h3 style={{ color: 'black', marginLeft: '20px' }}>User Type Details</h3>
                        </div>
                        <p style={{ color: 'black', marginLeft: '20px', fontSize: '18px', marginTop: '40px' }}>User Type</p>
                        <select
                            style={{ marginLeft: '20px', marginTop: '10px', padding: '8px', fontSize: '16px' }}
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                        >
                            <option value="">Select User Type</option>
                            <option value="Entity/Green Credit Applicant">Entity/Green Credit Applicant</option>
                            <option value="Implementing Agency">Implementing Agency</option>
                        </select>
                    </div>
                )}
                {selectedCircle === 2 && (
                    <div>
                        <div style={{ backgroundColor: '#f6f6f6', display: 'flex' }}>
                            <h3 style={{ color: 'black', marginLeft: '20px' }}>Entity Details</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '140px' }}>
                            <div>
                                <p style={{ color: 'black', marginLeft: '20px', fontSize: '18px', marginTop: '40px' }}>Entity Name (Company Name)</p>
                                <input
                                    type="text"
                                    style={{ marginLeft: '20px', marginTop: '5px', padding: '10px', fontSize: '16px', width: '350px' }}
                                    value={entityName}
                                    onChange={(e) => setEntityName(e.target.value)}
                                />
                            </div>
                            <div>
                                <p style={{ color: 'black', marginLeft: '20px', fontSize: '18px', marginTop: '40px' }}>Address (Company Address)</p>
                                <input
                                    type="text"
                                    style={{ marginLeft: '20px', marginTop: '5px', padding: '10px', fontSize: '16px', width: '350px' }}
                                    value={addressName}
                                    onChange={(e) => setaddressName(e.target.value)}
                                />
                            </div>
                        </div>
                        <p style={{ color: 'black', marginLeft: '20px', fontSize: '18px', marginTop: '40px' }}>Password</p>
                        <input
                            type="password"
                            style={{ marginLeft: '20px', marginTop: '5px', padding: '10px', fontSize: '16px', width: '350px' }}
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                        />
                    </div>
                )}
                {selectedCircle === 3 && (
                    <div>
                        <div style={{ backgroundColor: '#f6f6f6', display: 'flex' }}>
                            <h3 style={{ color: 'black', marginLeft: '20px' }}>Upload ID and Documents</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '140px' }}>
                            <div>
                                <p style={{ color: 'black', marginLeft: '20px', fontSize: '18px', marginTop: '40px' }}>Entity Type</p>
                                <select
                                    style={{ marginLeft: '20px', marginTop: '10px', padding: '8px', fontSize: '16px', width: '350px' }}
                                    value={entitytype}
                                    onChange={(e) => setentitytype(e.target.value)}
                                >
                                    <option value="">Select Entity Type</option>
                                    <option value="Government Institutions">Government Institutions</option>
                                    <option value="Public Sector Units">Public Sector Units</option>
                                    <option value="Non-Government Organisations">Non-Government Organisations</option>
                                    <option value="Private Companies">Private Companies</option>
                                    <option value="Philanthropies">Philanthropies</option>
                                    <option value="Individuals">Individuals</option>
                                    <option value="Registered Group of Individuals">Registered Group of Individuals</option>
                                </select>
                            </div>
                            <div>
                                <p style={{ color: 'black', marginLeft: '20px', fontSize: '18px', marginTop: '40px' }}>Identity Proof Number(Aadhar/PAN/GSTIN Number)</p>
                                <input
                                    type="text"
                                    style={{ marginLeft: '20px', marginTop: '5px', padding: '10px', fontSize: '16px', width: '350px' }}
                                    value={aadhar}
                                    onChange={(e) => setaadhar(e.target.value)}
                                />
                            </div>
                        </div>
                        <p style={{ color: 'black', marginLeft: '20px', fontSize: '18px', marginTop: '40px' }}>Upload Aadhar/TAN/PAN/CIN/GSTIN Image</p>
                        <div style={{ backgroundColor: '#f6f6f6', border: '1px dotted #ccc', padding: '20px', margin: 'auto', width: '920px', textAlign: 'center', height: '60px' }}>
                            {preview ? (
                                <>
                                    <img src={preview} alt="Preview" style={{ display: 'inline', width: '100px', height: '100px', marginTop: '-19px', marginLeft: '-850px' }} />
                                    <h1 style={{ fontWeight: 'bold', color: 'black', marginTop: '-70px', fontSize: '20px' }}>File Uploaded Successfully</h1>
                                </>
                            ) : (
                                <>
                                    <p style={{ fontWeight: 'bold', color: 'black', marginTop: '2px' }}>Drag Drop your files here</p>
                                    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
                                        <div>
                                            <input type="file" accept="image/*" onChange={handleFileChange} style={{ marginBottom: '10px', color: 'black' }} />
                                        </div>
                                    </form>
                                </>
                            )}

                        </div>
                    </div>
                )}
                {selectedCircle === 4 && (
                    <div>
                        <div style={{ backgroundColor: '#f6f6f6', display: 'flex' }}>
                            <h3 style={{ color: 'black', marginLeft: '20px' }}>Contact Details</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '140px' }}>
                            <div>
                                <p style={{ color: 'black', marginLeft: '20px', fontSize: '18px', marginTop: '40px' }}>Name of Authorized Person</p>
                                <input
                                    type="text"
                                    style={{ marginLeft: '20px', marginTop: '5px', padding: '10px', fontSize: '16px', width: '350px' }}
                                    value={authperson}
                                    onChange={(e) => setauthperson(e.target.value)}
                                />
                            </div>
                            <div>
                                <p style={{ color: 'black', marginLeft: '20px', fontSize: '18px', marginTop: '40px' }}>Designation</p>
                                <input
                                    type="text"
                                    style={{ marginLeft: '20px', marginTop: '5px', padding: '10px', fontSize: '16px', width: '350px' }}
                                    value={desig}
                                    onChange={(e) => setdesig(e.target.value)}
                                />
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '140px' }}>
                            <div>
                                <p style={{ color: 'black', marginLeft: '20px', fontSize: '18px', marginTop: '20px' }}>Contact Number</p>
                                <input
                                    type="text"
                                    style={{ marginLeft: '20px', marginTop: '5px', padding: '10px', fontSize: '16px', width: '350px' }}
                                    value={connum}
                                    onChange={(e) => setconnum(e.target.value)}
                                />
                            </div>
                            <div>
                                <p style={{ color: 'black', marginLeft: '20px', fontSize: '18px', marginTop: '20px' }}>Email</p>
                                <input
                                    type="email"
                                    style={{ marginLeft: '20px', marginTop: '5px', padding: '10px', fontSize: '16px', width: '350px' }}
                                    value={email}
                                    onChange={(e) => setemail(e.target.value)}
                                />
                            </div>
                        </div>
                        <label style={{ display: 'block', marginBottom: '10px', marginTop: '30px', marginLeft: '20px', color: 'black', fontSize: '15px' }}>
                            <input type="checkbox" checked={agreeTerms} onChange={handleCheckboxChange} style={{ marginRight: '5px' }} />
                            I hereby declare that the information provided above is true. I understand that false information may lead to the rejection of registration.
                        </label>
                    </div>
                )}
            </div>
            <div style={buttonContainerStyle}>
                {selectedCircle >= 4 ? (<button
                    style={{
                        backgroundColor: '#fff',
                        color: '#22C984',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                    onClick={handleFinishClick}
                >
                    Finish
                </button>) : (<button
                    style={{
                        backgroundColor: '#fff',
                        color: '#22C984',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                    onClick={handleNextClick}
                >
                    Next
                </button>)}
            </div>
            <div style={backContainerStyle}>
                {selectedCircle <= 1 ? (null) : (<button
                    style={{
                        backgroundColor: '#fff',
                        color: '#22C984',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                    onClick={handleBackClick}
                >
                    Back
                </button>)}
            </div>
        </div>
    );
};

export default UserSign;

