import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        
        {/* Верхняя часть с логотипом */}
        <div className="footer-top">
          <div className="footer-logo">
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

        {/* Центральная часть с ссылками */}
        <div className="footer-center">
          <div className="footer-links">
            <a href="#courses" className="footer-link">Курсы</a>
            <div className="link-dot"></div>
            <a href="#format" className="footer-link">Мастер-классы</a>
            <div className="link-dot"></div>
            <a href="#process" className="footer-link">Творческий процесс</a>
            <div className="link-dot"></div>
            <a href="#about" className="footer-link">О студии</a>
          </div>
          
          <div className="footer-social">
            <a href="#" className="social-link" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="18" cy="6" r="1" fill="currentColor"/>
              </svg>
            </a>
            <a href="#" className="social-link" aria-label="VK">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M2 8C2 5.79086 3.79086 4 6 4H18C20.2091 4 22 5.79086 22 8V16C22 18.2091 20.2091 20 18 20H6C3.79086 20 2 18.2091 2 16V8Z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12Z" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </a>
            <a href="#" className="social-link" aria-label="Telegram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M21 5L2 12.5L9 15M21 5L15.5 21L9 15M21 5L9 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
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