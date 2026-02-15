import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/AboutSection/AboutSection';
import PopularCourses from './components/PopularCourses/PopularCourses';
import CreativeProcess from './components/CreativeProcess/CreativeProcess';
import LessonFormat from './components/LessonFormat/LessonFormat';
import LessonsPage from './pages/LessonsPage/LessonsPage';
import AuthPage from './pages/Auth/AuthPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import BookingPage from './pages/BookingPage/BookingPage';
import WorkshopPage from './pages/WorkshopPage/WorkshopPage';
import Footer from './components/Footer/Footer';
import './App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  // Проверка авторизации при загрузке приложения
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('accessToken');
      const userStr = localStorage.getItem('user');
      
      console.log('🔍 Проверка авторизации при загрузке:', { 
        hasToken: !!token, 
        hasUser: !!userStr 
      });
      
      if (token && userStr) {
        try {
          const user = JSON.parse(userStr);
          console.log('✅ Найдены данные пользователя:', user);
          setIsLoggedIn(true);
          setUserData(user);
        } catch (e) {
          console.error('❌ Ошибка парсинга пользователя:', e);
          // Очищаем невалидные данные
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
        }
      } else {
        console.log('ℹ️ Данные авторизации не найдены');
      }
    };
    
    checkAuth();
  }, []);

  // Синхронизация состояния с localStorage при изменениях
  useEffect(() => {
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
    }
  }, [userData]);

  const navigateTo = (page, params = {}) => {
    console.log('🔄 Навигация на страницу:', page, params);
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleAuthSuccess = (user) => {
    console.log('✅ Успешная авторизация, пользователь:', user);
    setUserData(user);
    setIsLoggedIn(true);
    navigateTo('profile');
  };

  const handleLogout = () => {
    console.log('🚪 Выход из аккаунта');
    setIsLoggedIn(false);
    setUserData(null);
    // Очищаем все данные авторизации
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    navigateTo('home');
  };

  const handleLessonSelect = (lesson) => {
    if (!isLoggedIn) {
      navigateTo('auth');
      return;
    }

    if (lesson.type === 'video') {
      navigateTo('purchase');
    } else if (lesson.type === 'online') {
      navigateTo('booking');
    }
  };

  const renderPage = () => {
    console.log('📄 Рендеринг страницы:', currentPage);
    
    switch (currentPage) {
      case 'lessons':
        return (
          <LessonsPage 
            onLessonSelect={handleLessonSelect}
            isLoggedIn={isLoggedIn}
            navigateTo={navigateTo}
          />
        );
      
      case 'workshops':
        return (
          <WorkshopPage />
        );
      
      case 'booking':
        return (
          <BookingPage
            user={userData}
            navigateTo={navigateTo}
          />
        );
      
      case 'auth':
        return (
          <AuthPage 
            onSuccess={handleAuthSuccess} 
            navigateTo={navigateTo}
          />
        );
      
      case 'profile':
        return (
          <ProfilePage 
            onLogout={handleLogout}
            navigateTo={navigateTo}
          />
        );
      
      case 'home':
      default:
        return (
          <>
            <Hero />
            <About />
            <PopularCourses navigateTo={navigateTo} />
            <CreativeProcess />
            <LessonFormat />
          </>
        );
    }
  };

  return (
    <div className="app">
      <Header 
        currentPage={currentPage} 
        navigateTo={navigateTo}
        isLoggedIn={isLoggedIn}
        userData={userData}
        onLogout={handleLogout}
      />
      
      <main className="main-content">
        {renderPage()}
      </main>
      
      <Footer navigateTo={navigateTo} />
    </div>
  );
};

export default App;