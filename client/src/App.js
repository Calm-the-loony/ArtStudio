import React, { useState } from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero'; 
import About from './components/AboutSection/AboutSection';
import PopularCourses from './components/PopularCourses/PopularCourses';
import CreativeProcess from './components/CreativeProcess/CreativeProcess';
import LessonFormat from './components/LessonFormat/LessonFormat';
import Footer from './components/Footer/Footer'; // Добавьте эту строку
import './App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('gallery');
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <Hero />
      <About />
      <PopularCourses />
      <CreativeProcess />
      <LessonFormat />
      <Footer /> {/* Добавьте эту строку */}
    </div>
  );
};

export default App;