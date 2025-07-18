import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddNewsPage.css";
import Navigation from "./Navigation";

const AddNewsPage = () => {
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Nova vest:", { title, shortDescription, content, image });

    navigate("/blog");
  };

  return (
    <div>
      <Navigation />
      <div className="add-news-page">
        <h2>Dodaj novu vest</h2>
        <form onSubmit={handleSubmit} className="add-news-form">
          <div className="form-group">
            <label for="title">Naslov</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Unesite naslov vesti"
            />
          </div>

          <div className="form-group">
            <label for="shortDescription">Kratak opis</label>
            <input
              type="text"
              id="shortDescription"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              required
              placeholder="Unesite kratak opis vesti"
            />
          </div>

          <div className="form-group">
            <label for="content">Sadržaj</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              placeholder="Unesite sadržaj vesti"
            ></textarea>
          </div>

          <div className="form-group">
            <label for="image">Slika</label>
            <input
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <button type="submit" className="submit-btn">
            Objavi vest
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewsPage;
