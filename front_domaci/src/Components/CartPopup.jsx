import React, { useState, useEffect } from 'react';
import './CartPopup.css';

const CartPopup = ({ visible, onClose, onRemove, onCheckout }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (visible) {
      const savedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      const groupedItems = groupItemsById(savedItems);
      setItems(groupedItems);
    }
  }, [visible]);

  const groupItemsById = (cartItems) => {
    const grouped = cartItems.reduce((acc, item) => {
      const existingItem = acc.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        acc.push({ ...item });
      }
      return acc;
    }, []);
    return grouped;
  };

  const handleRemove = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    if (onRemove) onRemove(id);
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      alert('Korpa je prazna.');
    } else {
      console.log('Kupovina završena sa sledećim proizvodima:', items);
      setItems([]);
      localStorage.removeItem('cartItems');
      if (onCheckout) onCheckout();
      alert('Kupovina je završena, informacije o porudžbini su vam poslate na mejl!');
    }
  };

  if (!visible) return null;

  return (
    <div className="cart-popup-overlay">
      <div className="cart-popup">
        <h3>Vaša korpa</h3>
        <div className="cart-items">
          {items.length > 0 ? (
            items.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p>Komada: {item.quantity}</p>
                  <p>Cena po komadu: {item.price} RSD</p>
                  <p>Ukupna cena: {item.price * item.quantity} RSD</p>
                </div>
                <button className="remove-btn" onClick={() => handleRemove(item.id)}>
                  Ukloni
                </button>
              </div>
            ))
          ) : (
            <p>Vaša korpa je prazna.</p>
          )}
        </div>
        <div className="cart-actions">
          <button className="continue-shopping-btn" onClick={onClose}>
            Nastavi sa kupovinom
          </button>
          <button className="checkout-btn" onClick={handleCheckout}>
            Završi kupovinu
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPopup;
