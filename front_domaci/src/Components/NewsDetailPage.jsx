import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './NewsDetailPage.css';
import Navigation from './Navigation';

const NewsDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
 
  const { post } = location.state || {}; 
  
  const handleBack = () => {
    navigate('/blog'); 
  };

  if (!post) {
    return <div>Post nije pronađen.</div>;
  }

  return (
    <div>
      <Navigation/>
      <div className="news-detail-page">
        <button className="back-btn" onClick={handleBack}>Nazad na blog</button>
        <div className="news-detail">
          <h1>{post.title}</h1>
          <p className="news-date">{post.date}</p>
          <img src={post.image} alt={post.title} className="news-image" />
          <p className="news-content">{post.content}</p>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage;
