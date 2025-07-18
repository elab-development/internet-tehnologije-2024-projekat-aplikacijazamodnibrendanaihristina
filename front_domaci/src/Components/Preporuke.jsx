import React, { useState } from 'react';
import './Preporuke.css';
import Navigation from './Navigation';

const allProducts = [
  { id: 1, name: "Majica 1", image: "/images/majica1.jpg", price: 1500, style: "Sportski", category: "majice" },
  { id: 2, name: "Majica 2", image: "/images/majica2.jpg", price: 1800, style: "Old Money", category: "majice" },
  { id: 3, name: "Majica 3", image: "/images/majica3.jpg", price: 1200, style: "Baggie", category: "majice" },

  { id: 4, name: "Duks 1", image: "/images/duks1.jpg", price: 2000, style: "Sportski", category: "duksevi" },
  { id: 5, name: "Duks 2", image: "/images/duks2.jpg", price: 2200, style: "Old Money", category: "duksevi" },
  
  { id: 9, name: "Pantalone 1", image: "/images/pantalone1.jpg", price: 1500, style: "Old Money", category: "pantalone" },
  { id: 10, name: "Pantalone 2", image: "/images/pantalone2.jpg", price: 1800, style: "Old Money", category: "pantalone" },
  { id: 11, name: "Pantalone 3", image: "/images/pantalone3.jpg", price: 1700, style: "Baggie", category: "pantalone" },

  { id: 12, name: "Jakna 1", image: "/images/jakna1.jpg", price: 3000, style: "Sportski", category: "jakne" },
  { id: 13, name: "Jakna 2", image: "/images/jakna2.jpg", price: 3500, style: "Old Money", category: "jakne" },
  { id: 14, name: "Jakna 3", image: "/images/jakna3.jpg", price: 3300, style: "Baggie", category: "jakne" },

  { id: 15, name: "Haljina 1", image: "/images/haljina1.jpg", price: 4500, style: "Old Money", category: "haljine" },
  { id: 16, name: "Haljina 2", image: "/images/haljina2.jpg", price: 4800, style: "Old Money", category: "haljine" },
];

const Preporuke = () => {
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cartItems")) || []);

  const addToCart = (product) => {
    const currentCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const updatedCartItems = [...currentCartItems, { ...product, quantity: 1 }];
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const oldMoneyProducts = allProducts.filter(product => product.style === "Old Money");

  return (
    <div>
        <Navigation />
        <div className="preporuke">
        <div className="hero">
            <h1>Preporučujemo za Vas!</h1>
            <p>Na osnovu Vaših omiljenih stilova, izdvojili smo proizvode koji će Vam se svideti.</p>
        </div>

        <div className="style-section">
            <h2>Old Money Stil</h2>
            <div className="products-grid">
                {oldMoneyProducts.map(product => (
                <div key={product.id} className="product-card">
                    <img src={product.image} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p className="price">{product.price} RSD</p>
                    <button className="add-to-cart-btn" onClick={() => addToCart(product)}>Dodaj u korpu</button>
                </div>
                ))}
            </div>
        </div>
       
        </div>
    </div>
  );
};

export default Preporuke;
