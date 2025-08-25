import React, { useState, useEffect } from 'react';
import './Blog.css';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import Pagination from './Pagination';
import axios from 'axios';

const Blog = () => {
  const [posts, setPosts] = useState([]); 
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0
  });
  const postsPerPage = 3; 
  const navigate = useNavigate();


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/clanci', {
          params: {
            page: pagination.currentPage,
            per_page: postsPerPage, 
          },
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('auth_token'),
          }
        });

        setPosts(response.data.data); 

       
        setPagination({
          currentPage: response.data.meta.current_page,
          totalPages: response.data.meta.last_page,
          totalItems: response.data.meta.total,
        });
      } catch (error) {
        console.error('Error loading posts:', error);
      }
    };

    fetchPosts();
  }, [pagination.currentPage]); 


  const handleNextPage = () => {
    if (pagination.currentPage < pagination.totalPages) {
      setPagination(prev => ({
        ...prev,
        currentPage: prev.currentPage + 1,
      }));
    }
  };

  const handlePrevPage = () => {
    if (pagination.currentPage > 1) {
      setPagination(prev => ({
        ...prev,
        currentPage: prev.currentPage - 1,
      }));
    }
  };


  const handleReadMore = (id) => {
    navigate(`/blog/${id}`); 
  };

  return (
    <div>
      <Navigation />
      <div className="blog">
        <h1>Dobrodošli na naš blog!</h1>
        <p>Pročitajte najnovije vesti, savete i trendove iz sveta mode i stila.</p>

        <div className="blog-grid">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="blog-card">
                <img src={post.slika} alt={post.naslov} />
                <h2>{post.naslov}</h2>
                <p>Autor: {post.autor.username}</p>
                <p>Kreiran: {new Date(post.kreiran).toLocaleDateString()}</p>
                <button onClick={() => handleReadMore(post.id)}>Detalji</button>
              </div>
            ))
          ) : (
            <p>Nema postova za prikaz.</p>
          )}
        </div>

      
           <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPrev={handlePrevPage}
          onNext={handleNextPage}
        />
      </div>
    </div>
  );
};

export default Blog;
