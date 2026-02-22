import React, { useState, useEffect } from 'react';
import CourseCard from '../CourseCard/CourseCard';
import lessonService from '../../services/lessonService';
import './PopularCourses.css';

const PopularCourses = ({ navigateTo }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularCourses = async () => {
      try {
        setLoading(true);
        const data = await lessonService.getPopularLessons();
        const formattedCourses = data.map(lesson => 
          lessonService.formatLessonForCard(lesson)
        );
        setCourses(formattedCourses);
      } catch (err) {
        console.error('Error fetching popular courses:', err);
        setError('Не удалось загрузить курсы');
      } finally {
        setLoading(false);
      }
    };

    fetchPopularCourses();
  }, []);

  const handleCourseClick = (course) => {
    if (navigateTo) {
      navigateTo('lessons');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <section className="popular-courses" id="courses">
        <div className="container">
          <div className="loading-spinner">Загрузка курсов...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="popular-courses" id="courses">
        <div className="container">
          <div className="error-message">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="popular-courses" id="courses">
      <div className="container">
        <div className="section-header">
          <div className="section-title-container">
            <div className="section-title-main">ПОПУЛЯРНЫЕ</div>
            <div className="section-title-shadow">ПОПУЛЯРНЫЕ</div>
            
            <div className="section-title-second-main">КУРСЫ</div>
            <div className="section-title-second-shadow">КУРСЫ</div>
            
            <div className="section-subtitle-line">
              Каждый урок — это шаг к мастерству
            </div>
          </div>
          
          <p className="section-description">
            Выберите направление, которое вас вдохновляет, и начните свой творческий путь
          </p>
        </div>

        <div className="courses-grid">
          {courses.map((course) => (
            <CourseCard 
              key={course.id}
              course={course}
              variant="default"
              onClick={handleCourseClick}
            />
          ))}
        </div>

        <div className="all-courses-link">
          <button 
            className="all-courses-button"
            onClick={() => {
              if (navigateTo) navigateTo('lessons');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
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
};

export default PopularCourses;