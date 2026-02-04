// Hero.tsx с множественными версиями слова "искусство"
import { useState } from 'react';
import './Hero.css';

const Hero = () => {
  const [activeLayers, setActiveLayers] = useState({
    shadow: true,
    gradient: true,
    blur: true,
    highlighted: true,
    trail: true
  });

  const toggleLayer = (layer) => {
    setActiveLayers(prev => ({
      ...prev,
      [layer]: !prev[layer]
    }));
  };

  const word = "ИСКУССТВО";
  const letters = word.split('');

  return (
    <section className="hero">
      <div className="art-words-container">
        {/* Базовое слово */}
        <div className="base-word">ИСКУССТВО</div>
        
        {/* Дублирование 1: Тень */}
        {activeLayers.shadow && (
          <div className="shadow-word">ИСКУССТВО</div>
        )}
        
        {/* Дублирование 2: Градиент */}
        {activeLayers.gradient && (
          <div className="gradient-word">ИСКУССТВО</div>
        )}
        
        {/* Дублирование 3: Блюр */}
        {activeLayers.blur && (
          <div className="blur-word">ИСКУССТВО</div>
        )}
        
        {/* Дублирование 4: Выделенные буквы */}
        {activeLayers.highlighted && (
          <div className="highlighted-letters">
            {letters.map((letter, index) => (
              <span key={index}>{letter}</span>
            ))}
          </div>
        )}
        
        {/* Дублирование 5: Следы */}
        {activeLayers.trail && (
          <div className="trail-words">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="trail-word">ИСКУССТВО</div>
            ))}
          </div>
        )}
      </div>
      
      {/* Описание сбоку */}
      <div className="side-description">
        <div className="description-title">интерактивная типографика</div>
        <div className="description-text">
          Шесть слоёв одного слова, каждый со своим характером. 
          Игра с наложением, прозрачностью и движением создаёт 
          объём и глубину восприятия.
        </div>
      </div>
      
      {/* Контролы для слоёв */}
      <div className="controls">
        <div className="control-label">слои слова</div>
        <button 
          className={`control-button ${activeLayers.shadow ? 'active' : ''}`}
          onClick={() => toggleLayer('shadow')}
        >
          тень
        </button>
        <button 
          className={`control-button ${activeLayers.gradient ? 'active' : ''}`}
          onClick={() => toggleLayer('gradient')}
        >
          градиент
        </button>
        <button 
          className={`control-button ${activeLayers.blur ? 'active' : ''}`}
          onClick={() => toggleLayer('blur')}
        >
          размытие
        </button>
        <button 
          className={`control-button ${activeLayers.highlighted ? 'active' : ''}`}
          onClick={() => toggleLayer('highlighted')}
        >
          буквы
        </button>
        <button 
          className={`control-button ${activeLayers.trail ? 'active' : ''}`}
          onClick={() => toggleLayer('trail')}
        >
          следы
        </button>
      </div>
      
      {/* Навигация */}
      <div className="bottom-nav">
        <div className="nav-item">о проекте</div>
        <div className="nav-item">галерея</div>
        <div className="nav-item">мастер-классы</div>
        <div className="nav-item">контакты</div>
      </div>
    </section>
  );
};

export default Hero;