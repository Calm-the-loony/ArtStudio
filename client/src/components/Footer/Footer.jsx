import React from 'react';
import './Footer.css';

const Footer = ({ navigateTo }) => {
  return (
    <footer className="footer">
      <div className="footer-content">
        
        {/* Верхняя часть с логотипом */}
        <div className="footer-top">
          <div className="footer-logo" onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            if (navigateTo) navigateTo('home');
          }}>
            <div className="logo-circle">
              <span className="logo-art">🎨</span>
              <div className="logo-glow"></div>
            </div>
            <div className="logo-text">
              <h3 className="logo-title">ElArt</h3>
              <p className="logo-subtitle">Художественная студия Елены</p>
            </div>
          </div>
          
          <div className="footer-quote">
            <p>"Искусство там, где встречаются вдохновение и действие"</p>
          </div>
        </div>

        {/* Центральная часть — ссылки на СТРАНИЦЫ */}
        <div className="footer-center">
          <div className="footer-links">
            <button 
              className="footer-link"
              onClick={() => {
                if (navigateTo) navigateTo('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Главная
            </button>
            <div className="link-dot"></div>
            
            <button 
              className="footer-link"
              onClick={() => {
                if (navigateTo) navigateTo('lessons');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Уроки
            </button>
            <div className="link-dot"></div>
            
            <button 
              className="footer-link"
              onClick={() => {
                if (navigateTo) navigateTo('booking');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Запись
            </button>
            <div className="link-dot"></div>
            
            <button 
              className="footer-link"
              onClick={() => {
                if (navigateTo) navigateTo('workshops');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Мастерские
            </button>
          </div>
        </div>

        {/* Нижняя часть */}
        <div className="footer-bottom">
          <div className="copyright">
            <span>© {new Date().getFullYear()} ElArt </span>
            <span className="copyright-divider">•</span>
            <span>Все права защищены</span>
          </div>
          
          <button 
            className="scroll-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Наверх"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M19 12L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;