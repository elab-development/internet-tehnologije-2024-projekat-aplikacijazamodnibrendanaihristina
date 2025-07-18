import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductsPage.css";
import Navigation from "./Navigation";
import useUserRole from "./UseUserRole";
import CartPopup from "./CartPopup";

const ProductsPage = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const allProducts = [

    // Majice
    { id: 1, name: "Majica 1", image: "/images/majica1.jpg", price: 1500, style: "Sportski", category: "majice" },
    { id: 2, name: "Majica 2", image: "/images/majica2.jpg", price: 1800, style: "Old Money", category: "majice" },
    { id: 3, name: "Majica 3", image: "/images/majica3.jpg", price: 1200, style: "Baggie", category: "majice" },

    // Duksevi 
    { id: 4, name: "Duks 1", image: "/images/duks1.jpg", price: 2000, style: "Sportski", category: "duksevi" },
    { id: 5, name: "Duks 2", image: "/images/duks2.jpg", price: 2200, style: "Old Money", category: "duksevi" },
    
   
  
    // Pantalone
    { id: 9, name: "Pantalone 1", image: "/images/pantalone1.jpg", price: 1500, style: "Old Money", category: "pantalone" },
    { id: 10, name: "Pantalone 2", image: "/images/pantalone2.jpg", price: 1800, style: "Old Money", category: "pantalone" },
    { id: 11, name: "Pantalone 3", image: "/images/pantalone3.jpg", price: 1700, style: "Baggie", category: "pantalone" },
  
    // Jakne
    { id: 12, name: "Jakna 1", image: "/images/jakna1.jpg", price: 3000, style: "Sportski", category: "jakne" },
    { id: 13, name: "Jakna 2", image: "/images/jakna2.jpg", price: 3500, style: "Old Money", category: "jakne" },
    { id: 14, name: "Jakna 3", image: "/images/jakna3.jpg", price: 3300, style: "Baggie", category: "jakne" },
  
    // Haljine
    { id: 15, name: "Haljina 1", image: "/images/haljina1.jpg", price: 4500, style: "Old Money", category: "haljine" },
    { id: 16, name: "Haljina 2", image: "/images/haljina2.jpg", price: 4800, style: "Old Money", category: "haljine" },
  ];
  

  const styles = ["Sportski", "Old Money", "Baggie"];

  const [userRole] = useUserRole();

  useEffect(() => {
    const filteredProducts = allProducts.filter((product) => product.category.toLowerCase().includes(type));
    setProducts(filteredProducts);
  }, [type]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
  }, []);

  const handleStyleFilter = (style) => {
    setSelectedStyle(style);
  };

  const filteredProducts = selectedStyle
    ? products.filter((product) => product.style === selectedStyle)
    : products;

  const addToCart = (product) => {
    const currentCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const updatedCartItems = [...currentCartItems, { ...product, quantity: 1 }];
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    setIsCartOpen(true);
  };

  const handleCheckout = () => {
    alert("Vaša kupovina je obavljena, informacije o porudžbini su poslate na email.");
    setCartItems([]);
    localStorage.setItem("cartItems", JSON.stringify([]));
    setIsCartOpen(false);
  };

  return (
    <div>
      <Navigation />
      <div className="products-page">
        <div className="left-column">
          {userRole === "Shop Manager" && (
            <button className="add-product-btn" onClick={() => navigate("/dodaj-proizvod")}>
              Dodaj Novi Proizvod
            </button>
          )}
          <aside className="sidebar">
            <h3>Filtriraj po stilu</h3>
            <ul>
              {styles.map((style, index) => (
                <li
                  key={index}
                  onClick={() => handleStyleFilter(style)}
                  className={selectedStyle === style ? "active" : ""}
                >
                  {style}
                </li>
              ))}
            </ul>
          </aside>
        </div>
        <div className="right-column">
          <div className="header">
            <h1>Proizvodi - {type}</h1>
          </div>
          <div className="products-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div className="product-card" key={product.id}>
                  <img src={product.image} alt={product.name} className="product-image" />
                  <div className="product-info">
                    <h4>{product.name}</h4>
                    <p>{product.price} RSD</p>
                    {(userRole === "Korisnik" || userRole === "Bloger") && (
                      <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                        Dodaj u korpu
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="no-products">Nema proizvoda za prikaz.</p>
            )}
          </div>
        </div>
      </div>
      {isCartOpen && (
        <CartPopup
          items={cartItems}
          onClose={() => setIsCartOpen(false)}
          onCheckout={handleCheckout}
        />
      )}
    </div>
  );
};

export default ProductsPage;
