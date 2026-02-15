// CreativeProcess.jsx - ИСПРАВЛЕННЫЙ
import React from 'react';
import './CreativeProcess.css';

const CreativeProcess = () => {
  const stages = [
    {
      step: '01',
      title: 'Наблюдение',
      description: 'Смотрим, впитываем, находим образ. Первые наброски и идеи.',
      side: 'left'
    },
    {
      step: '02',
      title: 'Вдохновение',
      description: 'Выбираем композицию, цвет, настроение будущей работы.',
      side: 'right'
    },
    {
      step: '03',
      title: 'Создание',
      description: 'Рисуем. Слой за слоем, от эскиза до готовой картины.',
      side: 'left'
    },
    {
      step: '04',
      title: 'Завершение',
      description: 'Финальные штрихи. Работа готова — можно радоваться.',
      side: 'right'
    }
  ];

  return (
    <section className="art-process" id="process">
      {/* Цветные штрихи на фоне */}
      <div className="process-bg-decor">
        <div className="decor-stroke-1"></div>
        <div className="decor-stroke-2"></div>
        <div className="decor-stroke-3"></div>
        <div className="decor-stroke-4"></div>
      </div>

      <div className="art-process-container">
        {/* Заголовок в стиле GalleryPage */}
        <div className="process-header">
          <div className="process-title-container">
            <div className="process-title-main">ТВОРЧЕСКИЙ</div>
            <div className="process-title-shadow">ТВОРЧЕСКИЙ</div>
            
            <div className="process-title-second-main">ПРОЦЕСС</div>
            <div className="process-title-second-shadow">ПРОЦЕСС</div>
            
            <div className="process-subtitle-line">
              1 занятие = 1 рисунок
            </div>
          </div>
          
          <p className="process-description">
            Как рождается работа в нашей студии
          </p>
        </div>

        {/* Временная линия с этапами */}
        <div className="process-timeline">
          <div className="timeline-line"></div>
          
          <div className="process-steps">
            {stages.map((stage) => (
              <div 
                key={stage.step}
                className={`process-step ${stage.side}`}
              >
                <div className="step-marker"></div>
                
                <div className="step-content">
                  <div className="step-number">{stage.step}</div>
                  <h3 className="step-title">{stage.title}</h3>
                  <p className="step-description">{stage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreativeProcess;