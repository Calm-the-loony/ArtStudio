import React, { useState } from 'react';
import './Header.css';

const Header = ({ currentPage, navigateTo, isLoggedIn, setIsLoggedIn }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const items = [
    { id: 'home', label: 'Главная' },
    { id: 'lessons', label: 'Уроки' },
    { id: 'gallery', label: 'Галерея' },
    { id: 'workshops', label: 'Мастерские' },
  ];

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <div className="logo" onClick={() => navigateTo('home')}>
            <img src="/images/ElArt (круг).png" alt="ElArt" />
            <span className="logo-glow" />
            <div className="logo-text">
              <span>Художественная</span>
              <small>Студия Елены</small>
            </div>
          </div>

          <nav className="nav">
            {items.map(i => (
              <button
                key={i.id}
                className={currentPage === i.id ? 'active' : ''}
                onClick={() => navigateTo(i.id)}
              >
                {i.label}
              </button>
            ))}
          </nav>

          <button className="auth" onClick={() => setIsLoggedIn(!isLoggedIn)}>
            {isLoggedIn ? 'Выйти' : 'Войти'}
          </button>

          <button className="burger" onClick={() => setMenuOpen(!menuOpen)}>
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={`mobile ${menuOpen ? 'open' : ''}`}>
        {items.map(i => (
          <button key={i.id} onClick={() => navigateTo(i.id)}>
            {i.label}
          </button>
        ))}
        <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
          {isLoggedIn ? 'Выйти' : 'Войти'}
        </button>
      </div>
    </>
  );
};

export default Header;
