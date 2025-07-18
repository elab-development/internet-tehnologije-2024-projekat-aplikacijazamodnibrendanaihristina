import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AddStylePage.css";
import Navigation from "./Navigation";
import axios from "axios";

const AddStylePage = () => {
  const [styleName, setStyleName] = useState(""); 
  const [styles, setStyles] = useState([]); 
  const navigate = useNavigate();


  useEffect(() => {
    const fetchStyles = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/stilovi", {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("auth_token"), 
          },
        });
        setStyles(response.data.data); 
      } catch (error) {
        console.error("Error fetching styles:", error);
      }
    };

    fetchStyles();
  }, []);

  
  const handleAddStyle = async (e) => {
    e.preventDefault();
    
    if (styleName.trim() === "") {
      alert("Naziv stila ne može biti prazan!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/stilovi",
        { naziv: styleName }, 
        {
          headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("auth_token"),
          },
        }
      );

      setStyles([...styles, response.data.data]); 
      setStyleName(""); 
      alert("Stil uspešno dodat!");
    } catch (error) {
      console.error("Error adding style:", error);
      alert("Došlo je do greške prilikom dodavanja stila!. Pokušajte ponovo, i pogledajte da već takav stil ne postoji u listi.");
    }
  };

  return (
    <div>
      <Navigation />
      <div className="add-style-page">
        <h2 className="page-title">Dodaj Novi Stil Odeće</h2>

        <form className="style-form" onSubmit={handleAddStyle}>
          <div className="form-group">
            <label htmlFor="styleName">Naziv Stila:</label>
            <input
              type="text"
              id="styleName"
              value={styleName}
              onChange={(e) => setStyleName(e.target.value)}
              placeholder="Unesite naziv stila (npr. Casual, Sport)"
            />
          </div>

          <button type="submit" className="add-btn">
            Dodaj Stil
          </button>
        </form>

        <div className="existing-styles">
          <h3>Postojeći Stilovi</h3>
          <ul>
            {styles.length > 0 ? (
              styles.map((style, index) => (
                <li key={index}>{style.naziv}</li> 
              ))
            ) : (
              <li>Nemate nijedan stil.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddStylePage;
