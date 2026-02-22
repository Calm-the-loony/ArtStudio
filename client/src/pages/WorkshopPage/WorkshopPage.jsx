import React, { useState } from 'react';
import './WorkshopPage.css';

const WorkshopPage = () => {
  const [selectedTool, setSelectedTool] = useState(null);

  const studio = {
    title: 'Художественная мастерская',
    description: 'Просторное светлое помещение с профессиональным оборудованием для мастер-классов и творческих проектов',
    size: '80 м²',
    capacity: '8 человек',
    color: '#8a2be2',
    features: [
      'Естественный свет',
      'Мольберты',
      'Софиты',
      'Лаунж-зона',
      'Все материалы'
    ]
  };

  const tools = [
    {
      id: 1,
      name: 'Мольберты',
      type: 'оборудование',
      color: '#8a2be2',
      description: 'Профессиональные деревянные мольберты',
      icon: '🖼️'
    },
    {
      id: 3,
      name: 'Краски',
      type: 'материалы',
      color: '#FF6B8B',
      description: 'Профессиональные краски: масло, акрил, акварель',
      icon: '🎨'
    },
    {
      id: 4,
      name: 'Кисти',
      type: 'инструменты',
      color: '#96CEB4',
      description: 'Натуральные и синтетические кисти',
      icon: '🖌️'
    },
    {
      id: 5,
      name: 'Холсты',
      type: 'материалы',
      color: '#45B7D1',
      description: 'Грунтованные холсты разного формата',
      icon: '📄'
    },
    {
      id: 6,
      name: 'Свет',
      type: 'оборудование',
      color: '#FFD700',
      description: 'Профессиональные светильники',
      icon: '💡'
    },
    {
      id: 7,
      name: 'Палитры',
      type: 'инструменты',
      color: '#9B59B6',
      description: 'Деревянные и пластиковые палитры',
      icon: '🎨'
    }
  ];

  return (
    <section className="workshop-page" id="workshop">
      <div className="workshop-bg-decor">
        <div className="bg-stroke purple"></div>
        <div className="bg-stroke gold"></div>
        <div className="bg-stroke teal"></div>
        <div className="bg-stroke pink"></div>
      </div>

      <div className="workshop-container">
        <div className="workshop-header">
          <div className="workshop-title-typography">
            <div className="base-word">МАСТЕРСКАЯ</div>
            <div className="shadow-word">МАСТЕРСКАЯ</div>
            <div className="gradient-word">МАСТЕРСКАЯ</div>
            <div className="blur-word">МАСТЕРСКАЯ</div>
            <div className="highlighted-letters">
              {['М','А','С','Т','Е','Р','С','К','А','Я'].map((letter, index) => (
                <span key={index} className={index === 0 || index === 4 ? 'accent' : ''}>
                  {letter}
                </span>
              ))}
            </div>
          </div>
          
          <div className="workshop-subtitle-block">
            <p className="workshop-subtitle">
              Пространство для творчества
            </p>
          </div>
        </div>

        <div className="about-section">
          <div className="about-grid">
            <div className="about-content">
              <div className="section-label">О МАСТЕРСКОЙ</div>
              <h2 className="about-title">{studio.title}</h2>
              <p className="about-text">
                Студия для мастер-классов по живописи и рисунку. 
                Проводим занятия в студии и на выезде.
              </p>
            </div>
            
            <div className="about-visual">
              <div className="about-letter">М</div>
              <div className="about-strokes">
                <div className="stroke-item"></div>
                <div className="stroke-item"></div>
                <div className="stroke-item"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="studio-section">
          <div className="section-header">
            <div className="section-title-container">
              <div className="section-title-main">ПРОСТРАНСТВО</div>
              <div className="section-title-shadow">ПРОСТРАНСТВО</div>
              <div className="section-subtitle-line">
                ОДНА СТУДИЯ — РАЗНЫЕ ВОЗМОЖНОСТИ
              </div>
            </div>
          </div>

          <div className="studio-card" style={{ '--studio-color': studio.color }}>
            <div className="studio-visual">
              <div className="studio-letter">{'А'}</div>
              <div className="studio-dimensions">
                <span>{studio.size}</span>
                <span className="dimension-separator">•</span>
                <span>{studio.capacity}</span>
              </div>
            </div>

            <div className="studio-info">
              <h3 className="studio-title">{studio.title}</h3>
              <p className="studio-description">{studio.description}</p>
              
              <div className="studio-features-icons">
                <div className="feature-icon-item">
                  <span className="feature-icon">☀️</span>
                  <span className="feature-label">Естественный свет</span>
                </div>
                <div className="feature-icon-item">
                  <span className="feature-icon">🖼️</span>
                  <span className="feature-label">Мольберты</span>
                </div>
                <div className="feature-icon-item">
                  <span className="feature-icon">💡</span>
                  <span className="feature-label">Софиты</span>
                </div>
                <div className="feature-icon-item">
                  <span className="feature-icon">🛋️</span>
                  <span className="feature-label">Лаунж-зона</span>
                </div>
                <div className="feature-icon-item">
                  <span className="feature-icon">🎨</span>
                  <span className="feature-label">Все материалы</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="tools-section">
          <div className="section-header">
            <div className="section-title-container">
              <div className="section-title-main">ОБОРУДОВАНИЕ</div>
              <div className="section-title-shadow">ОБОРУДОВАНИЕ</div>
              <div className="section-subtitle-line">
                ВСЁ НЕОБХОДИМОЕ ДЛЯ РАБОТЫ
              </div>
            </div>
          </div>

          <div className="tools-grid">
            {tools.map(tool => (
              <div 
                key={tool.id}
                className="tool-card"
                onClick={() => setSelectedTool(tool)}
                style={{ '--tool-color': tool.color }}
              >
                <div className="tool-icon">{tool.icon}</div>
                <div className="tool-content">
                  <div className="tool-header">
                    <h4 className="tool-name">{tool.name}</h4>
                    <span className="tool-type">{tool.type}</span>
                  </div>
                  <div className="tool-description-preview">
                    {tool.description}
                  </div>
                </div>
                <div className="tool-accent" style={{ background: tool.color }}></div>
              </div>
            ))}
          </div>
        </div>

        <div className="formats-section">
          <div className="section-header">
            <div className="section-title-container">
              <div className="section-title-main">ФОРМАТЫ</div>
              <div className="section-title-shadow">ФОРМАТЫ</div>
              <div className="section-subtitle-line">
                КАК МЫ РАБОТАЕМ
              </div>
            </div>
          </div>

          <div className="formats-grid">
            <div className="format-card">
              <div className="format-number">01</div>
              <h3 className="format-title">В студии</h3>
              <p className="format-description">
                Занятия в оборудованном пространстве. Все материалы включены.
              </p>
              <div className="format-features">
                <span>До 8 человек</span>
                <span>2–4 часа</span>
              </div>
            </div>

            <div className="format-card">
              <div className="format-number">02</div>
              <h3 className="format-title">Выездные</h3>
              <p className="format-description">
                Приезжаем с оборудованием и материалами.
              </p>
              <div className="format-features">
                <span>Любая локация</span>
                <span>От 6 человек</span>
              </div>
            </div>

            <div className="format-card">
              <div className="format-number">03</div>
              <h3 className="format-title">Открытые уроки</h3>
              <p className="format-description">
                Пробные занятия без подготовки и опыта.
              </p>
              <div className="format-features">
                <span>1.5 часа</span>
                <span>Всё включено</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rules-section">
          <div className="section-header">
            <div className="section-title-container">
              <div className="section-title-main">ПРАВИЛА</div>
              <div className="section-title-shadow">ПРАВИЛА</div>
              <div className="section-subtitle-line">
                ЧТОБЫ БЫЛО КОМФОРТНО ВСЕМ
              </div>
            </div>
          </div>

          <div className="rules-grid">
            <div className="rule-item">
              <div className="rule-marker"></div>
              <h4 className="rule-heading">Чистота</h4>
              <p className="rule-text">
                Уберите рабочее место. Кисти можно помыть в раковине.
              </p>
            </div>

            <div className="rule-item">
              <div className="rule-marker"></div>
              <h4 className="rule-heading">Бережность</h4>
              <p className="rule-text">
                Относитесь к оборудованию аккуратно.
              </p>
            </div>

            <div className="rule-item">
              <div className="rule-marker"></div>
              <h4 className="rule-heading">Атмосфера</h4>
              <p className="rule-text">
                Делитесь опытом и вдохновляйте друг друга.
              </p>
            </div>
          </div>
        </div>
      </div>

      {selectedTool && (
        <div className="modal-overlay" onClick={() => setSelectedTool(null)}>
          <div className="modal-container" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedTool(null)}>×</button>
            
            <div className="modal-content">
              <div className="modal-icon-wrapper">
                <div className="modal-icon-large">{selectedTool.icon}</div>
                <div className="modal-color-dot" style={{ background: selectedTool.color }}></div>
              </div>
              
              <div className="modal-details">
                <span className="modal-type">{selectedTool.type}</span>
                <h3 className="modal-title">{selectedTool.name}</h3>
                <p className="modal-description">{selectedTool.description}</p>
                <div className="modal-info">
                  <span className="status-available">✓ В наличии</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default WorkshopPage;