import React from 'react';
import './LessonFormat.css';

const LessonFormat = () => {
  const formats = [
    {
      id: 1,
      type: 'СТУДИЯ',
      title: 'Живой мастер-класс',
      description: 'Создайте картину за одно занятие в нашей уютной студии с художником.',
      icon: '🎨',
      color: '#8a2be2',
      accentColor: 'rgba(138, 43, 226, 0.15)',
      features: [
        { icon: '👥', text: 'Маленькие группы до 8 чел' },
        { icon: '🎯', text: 'Все материалы включены' },
        { icon: '✨', text: 'Готовая работа за раз' },
        { icon: '📸', text: 'Фотосессия картины' }
      ],
      details: {
        duration: '2-3 часа',
        people: '8 человек',
        price: '2500 ₽'
      }
    },
    {
      id: 2,
      type: 'ОНЛАЙН',
      title: 'Урок по видеосвязи',
      description: 'Индивидуальное занятие из дома с персональным вниманием художника.',
      icon: '💻',
      color: '#4ECDC4',
      accentColor: 'rgba(78, 205, 196, 0.15)',
      features: [
        { icon: '🎧', text: 'Индивидуальный формат' },
        { icon: '📹', text: 'Запись занятия' },
        { icon: '🕒', text: 'Гибкое расписание' },
        { icon: '🌍', text: 'Из любой точки мира' }
      ],
      details: {
        duration: '1.5-2 часа',
        people: '1 на 1',
        price: '2000 ₽'
      }
    },
    {
      id: 3,
      type: 'ВИДЕО',
      title: 'Готовые видеоуроки',
      description: 'Профессиональные записи мастер-классов для обучения в своём ритме.',
      icon: '🎬',
      color: '#FF6B8B',
      accentColor: 'rgba(255, 107, 139, 0.15)',
      features: [
        { icon: '⏱️', text: 'В любое время 24/7' },
        { icon: '🔁', text: 'Можно пересматривать' },
        { icon: '🎞️', text: 'Профессиональный монтаж' },
        { icon: '📱', text: 'Доступ со всех устройств' }
      ],
      details: {
        duration: 'от 30 минут',
        people: 'личный доступ',
        price: 'от 1500 ₽'
      }
    }
  ];

  return (
    <section className="lesson-format" id="format">
      <div className="format-container">
        <div className="format-bg-elements">
          <div className="format-bg-orb orb-1"></div>
          <div className="format-bg-orb orb-2"></div>
          <div className="format-bg-orb orb-3"></div>
        </div>

        <div className="format-header">
          <div className="format-title-container">
            <div className="format-title-main">ФОРМАТЫ</div>
            <div className="format-title-shadow">ФОРМАТЫ</div>
            
            <div className="format-title-second-main">ЗАНЯТИЙ</div>
            <div className="format-title-second-shadow">ЗАНЯТИЙ</div>
            
            <div className="format-subtitle-line">
              3 способа научиться рисовать
            </div>
          </div>
          
          <p className="format-description">
            Выберите свой формат — от живого мастер-класса до видеоуроков
          </p>
        </div>

        <div className="formats-display">
          {formats.map((format, index) => (
            <div 
              key={format.id} 
              className="format-item"
              style={{ 
                '--item-color': format.color,
                '--item-accent': format.accentColor
              }}
            >
              <div className="format-corner"></div>
              
              {/* Основная карточка */}
              <div className="format-canvas">
                <div className="format-canvas-header">
                  <div className="format-type">
                    <span className="format-type-icon">{format.icon}</span>
                    <h3 className="format-type-title">{format.type}</h3>
                  </div>
                  <div className="format-number">0{index + 1}</div>
                </div>

                <h4 className="format-canvas-title">{format.title}</h4>
                <p className="format-canvas-description">{format.description}</p>

                <div className="format-features-grid">
                  {format.features.map((feature, idx) => (
                    <div key={idx} className="format-feature-item">
                      <div className="feature-icon">{feature.icon}</div>
                      <span className="feature-text">{feature.text}</span>
                    </div>
                  ))}
                </div>

                <div className="format-details-plate">
                  <div className="detail-row">
                    <span className="detail-label">Время</span>
                    <span className="detail-value">{format.details.duration}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Формат</span>
                    <span className="detail-value">{format.details.people}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Стоимость</span>
                    <span className="detail-value price">{format.details.price}</span>
                  </div>
                </div>

                <button className="format-action-btn">
                  <span>Узнать больше</span>
                  <div className="btn-arrow">→</div>
                </button>
              </div>

              <div className="format-paint-stroke stroke-1"></div>
              <div className="format-paint-stroke stroke-2"></div>
            </div>
          ))}
        </div>

        <div className="format-signature">
          <div className="signature-line"></div>
          <p className="signature-text">
            "Каждая встреча с искусством — это диалог,<br/>
            а мы создаём пространство для этого диалога"
          </p>
          <div className="signature-line"></div>
        </div>
      </div>
    </section>
  );
};

export default LessonFormat;