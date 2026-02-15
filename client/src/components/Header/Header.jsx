import React, { useState } from 'react';
import './Header.css';

const Header = ({ currentPage, navigateTo, isLoggedIn, onLogout, user }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const items = [
    { id: 'home', label: 'Главная' },
    { id: 'lessons', label: 'Уроки' },
    { id: 'booking', label: 'Запись' },         
    { id: 'workshops', label: 'Мастерские' },
  ];

  const handleAuthClick = () => {
    if (isLoggedIn) {
      onLogout();
      navigateTo('home');
    } else {
      navigateTo('auth');
    }
  };

  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigateTo('profile');
    } else {
      navigateTo('auth');
    }
  };

  // Получаем имя пользователя для отображения
  const getUserName = () => {
    if (user && user.name) {
      // Обрезаем имя, если оно слишком длинное
      return user.name.length > 15 ? user.name.substring(0, 12) + '...' : user.name;
    }
    return 'Профиль';
  };

  // Получаем первую букву имени для аватара
  const getUserInitial = () => {
    if (user && user.name) {
      return user.name.charAt(0).toUpperCase();
    }
    return '👤';
  };

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

          <div className="header-actions">
            {isLoggedIn ? (
              <>
                <button 
                  className="profile-link"
                  onClick={handleProfileClick}
                >
                  <span className="profile-icon">{getUserInitial()}</span>
                  <span className="profile-name">{getUserName()}</span>
                </button>
                <button className="logout-btn" onClick={handleAuthClick}>
                  Выйти
                </button>
              </>
            ) : (
              <button className="auth-btn" onClick={handleAuthClick}>
                Войти
              </button>
            )}
          </div>

          <button className="burger" onClick={() => setMenuOpen(!menuOpen)}>
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-header">
          <div className="logo" onClick={() => {
            navigateTo('home');
            setMenuOpen(false);
          }}>
            <img src="/images/ElArt (круг).png" alt="ElArt" />
            <div className="logo-text">
              <span>Художественная</span>
              <small>Студия Елены</small>
            </div>
          </div>
          <button className="close-btn" onClick={() => setMenuOpen(false)}>
            ✕
          </button>
        </div>

        <div className="mobile-nav">
          {items.map(i => (
            <button 
              key={i.id} 
              className={`mobile-nav-item ${currentPage === i.id ? 'active' : ''}`}
              onClick={() => {
                navigateTo(i.id);
                setMenuOpen(false);
              }}
            >
              {i.label}
            </button>
          ))}
        </div>

        <div className="mobile-footer">
          {isLoggedIn ? (
            <>
              <button 
                className="mobile-profile-link"
                onClick={() => {
                  navigateTo('profile');
                  setMenuOpen(false);
                }}
              >
                <span className="mobile-profile-icon">{getUserInitial()}</span>
                <span className="mobile-profile-name">{getUserName()}</span>
              </button>
              <button 
                className="mobile-logout"
                onClick={() => {
                  onLogout();
                  setMenuOpen(false);
                  navigateTo('home');
                }}
              >
                Выйти
              </button>
            </>
          ) : (
            <button 
              className="mobile-auth-btn"
              onClick={() => {
                navigateTo('auth');
                setMenuOpen(false);
              }}
            >
              Войти
            </button>
          )}
        </div>
      </div>
      
      {menuOpen && <div className="menu-overlay" onClick={() => setMenuOpen(false)} />}
    </>
  );
};

export default Header;