import React, { useState, useEffect } from 'react';
import BlogHeader from './BlogHeader';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const pageStyle = {
    background: 'linear-gradient(to right, #20AE8E, #22C984)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    position: 'relative',
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

const lineStyle = {
    backgroundColor: 'grey',
    height: '1px',
    width: '94%',
    marginTop: '22px',
    marginLeft: '5px',
};

const Blog = () => {
    const navigate = useNavigate();
    const [blogdetails, setblogdetails] = useState([]);
    const handlelogin = () => {
        navigate('/bloglogin')
    }
    const fetchProductuserDetails = async () => {
        try {
            const response = await axios.get('http://localhost:5001/blogproductdetails');
            if (response.data.status === 'ok') {
                setblogdetails(response.data.data);
            } else {
                console.error(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };
    const renderBlogPosts = () => {
        return blogdetails.map((post, index) => (
            <div key={index} style={{ ...blogPostContainerStyle, marginBottom: '60px' }}>
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
    useEffect(() => {
        fetchProductuserDetails();
    }, []);
    return (
        <>
            <BlogHeader text="Log In" style={{ background: '#0B6E4F' }} onPress={handlelogin} />
            <div style={pageStyle}>
                <div style={{ marginTop: '100px', width: '1360px' }}>
                    <h1>Welcome to BlogPost</h1>
                    <p style={{ textAlign: 'justify', fontSize: '17px', lineHeight: '30px' }}>BlogPost is a dedicated blog page within the green credit management system designed to enhance user engagement and awareness about green credit initiatives. This platform allows users to share and explore various projects, stories, and insights related to environmental sustainability and green credit. By featuring user-generated content, including detailed project descriptions, images, and personal experiences, BlogPost fosters a community-driven approach to green credit education and promotion. The intuitive and visually appealing layout ensures that users can easily navigate through posts, gain inspiration, and contribute their own stories, ultimately driving collective efforts towards a greener future. Through BlogPost, the green credit management system not only informs but also empowers users to actively participate in and advocate for sustainable practices.</p>
                </div>
                <div style={{ ...lineStyle }} />
                <div>
                    {renderBlogPosts()}
                </div>
            </div>
        </>
    );
};

export default Blog;