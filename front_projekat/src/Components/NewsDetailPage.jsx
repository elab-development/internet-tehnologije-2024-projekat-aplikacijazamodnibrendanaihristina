import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import './NewsDetailPage.css';
import Navigation from './Navigation';

const NewsDetailPage = () => {
  const { newsId } = useParams(); 
  const navigate = useNavigate();
  
  const [article, setArticle] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/clanci/${newsId}`, {
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('auth_token'),
          }
        });
        setArticle(response.data.data); 
        setLoading(false);
      } catch (err) {
        setError('Došlo je do greške prilikom učitavanja članka.');
        setLoading(false);
      }
    };

    fetchArticle(); 
  }, [newsId]); 

  const handleBack = () => {
    navigate('/blog'); 
  };

  if (loading) {
    return <div>Učitavanje...</div>; 
  }

  if (error) {
    return <div>{error}</div>; 
  }

  if (!article) {
    return <div>Članak nije pronađen.</div>; 
  }

  return (
    <div>
        <Navigation />
        <div className="news-detail-page">
            <button className="back-btn" onClick={handleBack}>Nazad na blog</button>
            <div className="news-detail">
                <h1>{article.naslov}</h1> 
                <p className="news-date">{new Date(article.kreiran).toLocaleDateString()}</p> 
                <img src={article.slika} alt={article.naslov} className="news-image" /> 
                <p className="news-content">{article.sadrzaj}</p> 
                <p className="news-author">Autor: {article.autor.username}</p> 
            </div>
        </div>
    </div>
  );
};

export default NewsDetailPage;
