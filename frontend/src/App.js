import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/Mainpage';
import ChoicePage from './components/ChoicePage';
import UserLog from './components/UserLog';
import UserSign from './components/UserSign';
import Admin from './components/Admin';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import AdminSignUp from './components/AdminSignUp';
import Blog from './components/Blog';
import Bloglog from './components/BlogLogin';
import BlogUser from './components/BlogUser';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/choice" element={<ChoicePage />} />
          <Route path="/signup" element={<UserSign />} />
          <Route path="/login" element={<UserLog />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/userdashboard/:name" element={<UserDashboard />} />
          <Route path="/admindashboard/:userId" element={<AdminDashboard />} />
          <Route path="/userlog" element={<UserLog />} />
          <Route path="/adminsignup" element={<AdminSignUp />} />
          <Route path="/blog" element={<Blog />} />
          <Route path='/bloglogin' element={<Bloglog />} />
          <Route path='/bloguser/:name' element={<BlogUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
