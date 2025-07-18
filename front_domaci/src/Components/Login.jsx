import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import useUserRole from './UseUserRole';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [role, setRole] = useUserRole()
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Molimo vas da popunite sva polja.');
      return;
    }

    if (email === 'test@modnibrend.com' && password === '123456') {
      setRole('Shop Manager');
      navigate('/shop');
    } else if (email === 'ana.petrovic@modnibrend.com' && password === '123456') {
      setRole('Shop Manager');
      navigate('/shop');
    } else if (email === 'blogger@example.com' && password === '123456') {
      setRole('Bloger');
      navigate('/shop');
    } else {
      setRole('Korisnik');
      navigate('/shop');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="login-title">Prijavite se</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email adresa</label>
            <input
              type="email"
              id="email"
              placeholder="Unesite vaš email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Šifra</label>
            <input
              type="password"
              id="password"
              placeholder="Unesite vašu šifru"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Prijava</button>
        </form>
        <p className="register-prompt">
          Nemate nalog? <a href="/registracija" className="register-link">Registrujte se</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
