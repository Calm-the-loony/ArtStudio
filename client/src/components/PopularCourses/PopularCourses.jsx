import './PopularCourses.css';

const courses = [
  {
    id: 1,
    title: 'Акварель',
    subtitle: 'Основы акварели',
    price: '2500 ₽',
    description: 'Полный курс из 8 уроков по технике акварельной живописи',
    lessons: 8,
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    icon: '🎨',
    features: ['Основы техники', 'Работа с цветом', 'Пейзажи и натюрморты'],
  },
  {
    id: 2,
    title: 'Уголь',
    subtitle: 'Рисование углем',
    price: '1800 ₽',
    description: 'Техники работы с углем и графитом для создания выразительных рисунков',
    lessons: 6,
    gradient: 'linear-gradient(135deg, #434343 0%, #000000 100%)',
    icon: '✏️',
    features: ['Техники штриховки', 'Работа с тоном', 'Портретная графика'],
  },
  {
    id: 3,
    title: 'Масло',
    subtitle: 'Масляная живопись',
    price: '3200 ₽',
    description: 'Изучение классических техник масляной живописи на холсте',
    lessons: 10,
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
    icon: '🖼️',
    features: ['Техника "по-сырому"', 'Имприматура', 'Лессировки'],
  },
  {
    id: 4,
    title: 'Скетчинг',
    subtitle: 'Быстрые зарисовки',
    price: '2000 ₽',
    description: 'Курс по современному скетчингу для начинающих и профи',
    lessons: 7,
    gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    icon: '📓',
    features: ['Архитектурный скетч', 'Фэшн-иллюстрация', 'Travel-скетчинг'],
  },
  {
    id: 5,
    title: 'Академический рисунок',
    subtitle: 'Основы рисунка',
    price: '2800 ₽',
    description: 'Классическая школа академического рисунка от простого к сложному',
    lessons: 12,
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    icon: '📐',
    features: ['Перспектива', 'Композиция', 'Светотень', 'Геометрические тела'],
  },
  {
    id: 6,
    title: 'Графика',
    subtitle: 'Искусство линии',
    price: '2200 ₽',
    description: 'Работа с тушью, пером и другими графическими материалами',
    lessons: 9,
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    icon: '🖋️',
    features: ['Работа с тушью', 'Каллиграфия', 'Иллюстрация', 'Орнаменты'],
  },
];

const PopularCourses = () => (
  <section className="popular-courses" id="courses">
    {/* Убраны анимированные орбы на фоне */}
    
    <div className="container">
      {/* Заголовок секции - убрана верхняя метка */}
      <div className="section-header">
        <h2 className="section-title">
          <span className="gradient-text">ПОПУЛЯРНЫЕ</span>
          КУРСЫ
        </h2>
        <p className="section-subtitle">
          Выберите направление, которое вас вдохновляет, и начните свой творческий путь
        </p>
      </div>

      {/* Сетка курсов - теперь 6 карточек */}
      <div className="courses-grid">
        {courses.map((course) => (
          <div className="course-card" key={course.id}>
            {/* Карточка курса */}
            <div className="card-inner">
              {/* Верхняя часть с градиентом */}
              <div 
                className="card-header"
                style={{ background: course.gradient }}
              >
                <div className="card-icon">{course.icon}</div>
                <div className="card-badge">
                  <span>{course.lessons} уроков</span>
                </div>
              </div>

              {/* Основной контент */}
              <div className="card-content">
                <div className="course-title-group">
                  <h3>{course.title}</h3>
                  <p className="course-subtitle">{course.subtitle}</p>
                </div>

                <p className="course-description">{course.description}</p>

                {/* Особенности курса */}
                <ul className="course-features">
                  {course.features.map((feature, idx) => (
                    <li key={idx}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Цена и кнопка */}
                <div className="card-footer">
                  <div className="price-block">
                    <span className="price-label">стоимость</span>
                    <div className="price-value">{course.price}</div>
                  </div>
                  <button className="course-button">
                    <span>Выбрать курс</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Эффект свечения */}
            <div className="card-glow"></div>
          </div>
        ))}
      </div>

      {/* Кнопка "Все курсы" */}
      <div className="all-courses-link">
        <button className="all-courses-button">
          <span>Смотреть все курсы</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M14 6L20 12L14 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  </section>
);

export default PopularCourses;