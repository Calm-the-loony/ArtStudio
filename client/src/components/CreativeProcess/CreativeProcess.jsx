import './CreativeProcess.css';

const CreativeProcess = () => {
  const stages = [
    {
      step: '01',
      title: 'Наблюдение',
      subtitle: 'Эскиз • 2-3 дня',
      description: 'Зарисовки, заметки, коллажи. Сбор визуального материала и впечатлений.',
      details: [
        'Прогулки и фотосессии',
        'Быстрые наброски',
        'Создание мудбордов',
        'Исследование материалов'
      ],
      accentColor: '#FF6B8B',
      icon: '👁️'
    },
    {
      step: '02',
      title: 'Вдохновение',
      subtitle: 'Идея • 1 день',
      description: 'Первые линии, поиск композиции, цветовой палитры и настроения.',
      details: [
        'Цветовые гармонии',
        'Композиционные эскизы',
        'Эмоциональная карта',
        'Подбор материалов'
      ],
      accentColor: '#4ECDC4',
      icon: '✨'
    },
    {
      step: '03',
      title: 'Создание',
      subtitle: 'Работа на холсте • 4-10 дней',
      description: 'Слои краски, текстуры, эксперименты. Интуиция ведёт руку.',
      details: [
        'Базовые слои и грунт',
        'Текстуры и фактуры',
        'Эксперименты с техниками',
        'Динамика мазков'
      ],
      accentColor: '#45B7D1',
      icon: '🖌️'
    },
    {
      step: '04',
      title: 'Завершение',
      subtitle: 'Финальные штрихи • 1-2 дня',
      description: 'Финальные штрихи, отражение в зеркале, отдых перед последним взглядом.',
      details: [
        'Детальная проработка',
        'Оценка со стороны',
        'Корректировка тонов',
        'Финальная лакировка'
      ],
      accentColor: '#96CEB4',
      icon: '✅'
    }
  ];

  return (
    <section className="art-process" id="process">
      <div className="art-process-container">
        {/* Заголовок */}
        <div className="art-process-header">
          <div className="art-process-title-wrapper">
            <h2 className="art-process-title">
              <span className="art-process-title-accent">МОЙ</span>
              <span className="art-process-title-main">ТВОРЧЕСКИЙ ПУТЬ</span>
            </h2>
            <p className="art-process-subtitle">
              От идеи до воплощения — путешествие в мир искусства
            </p>
          </div>
        </div>

        {/* Визуальная линия процесса */}
        <div className="art-process-visual">
          <div className="art-process-timeline">
            <div className="art-process-timeline-line"></div>
            
            {stages.map((stage, index) => (
              <div 
                key={stage.step}
                className="art-process-step"
                style={{ '--step-color': stage.accentColor }}
              >
                {/* Маркер на линии */}
                <div className="art-process-marker">
                  <div className="art-process-marker-dot"></div>
                  <div className="art-process-marker-number">{stage.step}</div>
                </div>

                {/* Карточка этапа */}
                <div className="art-process-card">
                  <div className="art-process-card-header">
                    <div className="art-process-card-icon">{stage.icon}</div>
                    <div className="art-process-card-title">
                      <h3>{stage.title}</h3>
                      <p className="art-process-card-subtitle">{stage.subtitle}</p>
                    </div>
                  </div>
                  
                  <p className="art-process-card-description">{stage.description}</p>
                  
                  <div className="art-process-card-details">
                    {stage.details.map((detail, idx) => (
                      <div key={idx} className="art-process-card-detail">
                        <div className="art-process-card-detail-marker"></div>
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Цитата */}
        <div className="art-process-quote">
          <div className="art-process-quote-content">
            <div className="art-process-quote-mark">"</div>
            <p className="art-process-quote-text">
              Каждая работа — это диалог между художником и миром. 
              В этом диалоге рождается нечто новое, уникальное и настоящее.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreativeProcess;