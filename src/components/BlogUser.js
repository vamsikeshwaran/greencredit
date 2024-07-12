import React, { useState, useEffect } from 'react';
import BlogHeader from './BlogHeader';
import { useParams, useNavigate } from 'react-router-dom';
import Button from './Button';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import axios from 'axios';

const firebaseConfig = {
    apiKey: "AIzaSyAsGayhEtgleRGsDCme40wu8Z0d-F3yApI",
    authDomain: "videoai-a83c6.firebaseapp.com",
    projectId: "videoai-a83c6",
    storageBucket: "videoai-a83c6.appspot.com",
    messagingSenderId: "1074917851230",
    appId: "1:1074917851230:web:f2f54dc1e509e71a84f4cf",
    measurementId: "G-4QPLKQX4YQ"
};
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

const pageStyle = {
    background: 'linear-gradient(to right, #20AE8E, #22C984)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    color: 'white',
    padding: '20px',
    overflowY: 'auto',
};

const lineStyle = {
    backgroundColor: 'grey',
    height: '1px',
    width: '94%',
    marginTop: '22px',
    marginLeft: '40px',
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
    height: '550px'
};

const inputStyle = {
    marginBottom: '10px',
    padding: '8px',
    width: '90%',
    height: '15px',
    borderRadius: '4px',
    border: '1px solid #ccc',
};

const textareaStyle = {
    marginBottom: '10px',
    padding: '8px',
    width: '90%',
    height: '100px',
    borderRadius: '4px',
    border: '1px solid #ccc',
};

const blogPostContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    background: 'linear-gradient(to right, #E1DADA, #ffffff)',
    color: 'black',
    borderRadius: '8px',
    padding: '20px',
    margin: '20px 40px',
    alignItems: 'center',
    gap: '20px',
};

const blogImageStyle = {
    height: '300px',
    borderRadius: '8px',
    width: '300px'
};

const blogContentStyle = {
    display: 'flex',
    flexDirection: 'column',
};

const blogMetaStyle = {
    marginBottom: '10px',
    fontSize: '14px',
    color: 'grey',
};

const BlogUserDashboard = () => {
    const navigate = useNavigate();
    const { name } = useParams();
    const [preview, setPreview] = useState(null);
    const [imageurl, setimageurl] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [blog, setblog] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        project: '',
    });
    const collectionName = `user_${name}`;
    useEffect(() => {
        if (collectionName) {
            fetchBlogDetails(collectionName);
        }
    }, [collectionName]);

    const addpost = () => {
        setIsModalOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        setPreview(URL.createObjectURL(file));
        const storageRef = storage.ref();
        const fileRef = storageRef.child(file.name);
        try {
            await fileRef.put(file);
            const downloadURL = await fileRef.getDownloadURL();
            setimageurl(downloadURL);
            console.log('File uploaded successfully');
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const handlelogout = () => {
        navigate('/blog');
    };

    const fetchBlogDetails = async (collectionName) => {
        try {
            const response = await axios.get(`http://localhost:5001/blogdetails/${collectionName}`);
            if (response.data.status === "ok") {
                console.log(response.data.data)
                setblog(response.data.data)
            } else {
                console.error(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    const handleBlogsubmit = async () => {
        const date = new Date();
        const approvalDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        const userData = {
            identifier: "Blog",
            title: formData.title,
            name: name,
            date: approvalDate,
            description: formData.project,
            image: imageurl
        };

        try {
            const response = await axios.post('http://localhost:5001/addpost', userData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.data.status === "ok") {
                setIsModalOpen(false);
                setFormData({ title: '', project: '' });
                setPreview(null);
                fetchBlogDetails(collectionName);
            } else {
                console.log(response.data);
            }
        } catch (error) {
            console.error('There was an error registering the user!', error);
        }
    };

    const renderBlogPosts = () => {
        return blog.map((post, index) => (
            <div key={index} style={blogPostContainerStyle}>
                <img src={post.image} alt={post.name} style={blogImageStyle} />
                <div style={blogContentStyle}>
                    <h1>{post.title}</h1>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                        <p style={blogMetaStyle}>Author Name: {post.name}</p>
                        <p style={blogMetaStyle}>Date Posted: {post.date}</p>
                    </div>
                    <p style={{ textAlign: 'justify' }}><strong style={{ textDecoration: 'underline' }}>Project Description</strong> : {post.description}</p>
                </div>
            </div>
        ));
    };

    return (
        <>
            <BlogHeader text="Log Out" style={{ background: '#0B6E4F' }} onPress={handlelogout} />
            <div style={pageStyle}>
                {isModalOpen && <div style={modalOverlayStyle} onClick={handleCloseModal} />}
                <div style={{ display: 'flex', marginTop: '120px', marginLeft: '40px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px', marginTop: '8px' }}>
                        <h2 style={{ marginTop: '-2px' }}>Welcome</h2>
                        <h3 style={{ marginTop: '-6px' }}>{name}</h3>
                    </div>
                    <Button text="+ Add Post" style={{ height: '45px', marginLeft: '1050px', marginTop: '18px' }} onClick={addpost} />
                </div>
                <div style={{ ...lineStyle }} />
                {isModalOpen && (
                    <div style={modalOverlayStyle}>
                        <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                            <h2 style={{ color: '#0B6E4F' }}>Add Post</h2>
                            <h4 style={{ color: '#0B6E4F', marginRight: '360px', marginBottom: '10px' }}>Project Title</h4>
                            <input
                                style={inputStyle}
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="Project Title"
                            />
                            <h4 style={{ color: '#0B6E4F', marginRight: '350px', marginBottom: '-60px', marginTop: '5px' }}>Upload Image</h4>
                            <div style={{ backgroundColor: '#f6f6f6', border: '1px dotted #ccc', padding: '20px', width: '423px', textAlign: 'center', height: '90px', marginTop: '80px' }}>
                                {preview ? (
                                    <>
                                        <h1 style={{ fontWeight: 'bold', color: 'black', marginTop: '25px', fontSize: '20px' }}>File Uploaded Successfully</h1>
                                    </>
                                ) : (
                                    <>
                                        <p style={{ fontWeight: 'bold', color: 'black', marginTop: '2px' }}>Drag Drop your files here</p>
                                        <form style={{ maxWidth: '400px', margin: 'auto' }}>
                                            <div>
                                                <input type="file" accept="image/*" onChange={handleFileChange} style={{ marginBottom: '10px', color: 'black' }} />
                                            </div>
                                        </form>
                                    </>
                                )}
                            </div>
                            <h4 style={{ color: '#0B6E4F', marginRight: '310px', marginBottom: '10px' }}>Project Description</h4>
                            <textarea
                                style={textareaStyle}
                                type="text"
                                name="project"
                                value={formData.project}
                                onChange={handleInputChange}
                                placeholder="Project Description"
                            />
                            <div style={{ display: 'flex', gap: '250px' }}>
                                <Button text="Submit" style={{ marginTop: '20px' }} onClick={handleBlogsubmit} />
                                <Button text="Close" onClick={handleCloseModal} style={{ marginTop: '20px' }} />
                            </div>
                        </div>
                    </div>
                )}
                <h2 style={{ marginTop: '20px', marginLeft: '50px' }}>Your posts</h2>
                {renderBlogPosts()}
            </div>
        </>
    );
};

export default BlogUserDashboard;

