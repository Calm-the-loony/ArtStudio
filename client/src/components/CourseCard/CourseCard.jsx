import React from 'react';
import './CourseCard.css';

const CourseCard = ({ course, variant = 'default', onClick, isLoggedIn }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(course);
    }
  };

  return (
    <div className={`cc-card ${variant}`}>
      <div className="cc-card-inner">
        <div 
          className="cc-header"
          style={variant === 'default' 
            ? { background: course.gradient }
            : { backgroundColor: course.imageColor }
          }
        >
          <div className="cc-icon">{course.icon}</div>
          <div className="cc-badge">
            <span>{course.lessons || course.duration || '8 уроков'}</span>
          </div>
          {variant === 'lessons' && course.level && (
            <div className="cc-level-badge">{course.level}</div>
          )}
          {variant === 'lessons' && course.type === 'video' && (
            <div className="cc-type-badge video">Видео</div>
          )}
          {variant === 'lessons' && course.isNew && (
            <div className="cc-type-badge new">Новинка</div>
          )}
          {variant === 'lessons' && course.isPopular && (
            <div className="cc-type-badge popular">Популярный</div>
          )}
        </div>

        <div className="cc-content">
          <div className="cc-title-group">
            <h3>{course.title}</h3>
            <p className="cc-subtitle">{course.subtitle || course.category}</p>
          </div>

          <p className="cc-description">{course.description}</p>

          <ul className="cc-features">
            {(course.features || []).map((feature, idx) => (
              <li key={idx}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {variant === 'lessons' && (
            <div className="cc-lesson-meta">
              <div className="cc-meta-item">
                <span className="cc-meta-icon">⏱️</span>
                <span>{course.duration}</span>
              </div>
              <div className="cc-meta-item">
                <span className="cc-meta-icon">👨‍🎨</span>
                <span>{course.students}</span>
              </div>
              <div className="cc-meta-item">
                <span className="cc-meta-icon">
                  {course.type === 'online' ? '👩‍🏫' : '🎥'}
                </span>
                <span>{course.type === 'online' ? 'Онлайн' : 'Видео'}</span>
              </div>
            </div>
          )}

          <div className="cc-footer">
            <div className="cc-price-block">
              <span className="cc-price-label">стоимость</span>
              <div className="cc-price-value">{course.price}</div>
            </div>
            <button 
              className="cc-button"
              onClick={handleClick}
            >
              <span>
                {variant === 'default' && 'Выбрать курс'}
                {variant === 'lessons' && !isLoggedIn && 'Войти'}
                {variant === 'lessons' && isLoggedIn && course.type === 'online' && 'Записаться'}
                {variant === 'lessons' && isLoggedIn && course.type === 'video' && 'Купить'}
              </span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="cc-glow"></div>
    </div>
  );
};

export default CourseCard;