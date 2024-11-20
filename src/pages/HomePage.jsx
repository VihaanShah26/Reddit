import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import PostList from '../components/PostList';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <Navbar />
      <div className="main-content">
        <PostList />
      </div>
    </div>
  );
};

export default HomePage;