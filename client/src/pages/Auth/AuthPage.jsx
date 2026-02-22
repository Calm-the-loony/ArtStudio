import React, { useState } from 'react';
import './AuthPage.css';

const AuthPage = ({ onSuccess, navigateTo }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    bio: '',
    agreeToTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState('');

  // Настройки API
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const payload = isLogin 
        ? { 
            email: formData.email, 
            password: formData.password 
          }
        : { 
            name: formData.name, 
            email: formData.email, 
            password: formData.password,
            bio: formData.bio || ''
          };

      console.log('📤 Отправка запроса на:', endpoint);
      console.log('📦 Данные:', payload);

      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      console.log('📥 Ответ сервера:', data);

      if (!response.ok) {
        if (data.errors && Array.isArray(data.errors)) {
          const errorMessages = data.errors.map(err => err.msg).join(', ');
          throw new Error(errorMessages);
        }
        throw new Error(data.message || 'Произошла ошибка');
      }

      if (data.success) {
        // Очищаем старые данные перед сохранением новых
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        
        // Сохраняем токены
        if (data.data.tokens) {
          localStorage.setItem('accessToken', data.data.tokens.accessToken);
          localStorage.setItem('refreshToken', data.data.tokens.refreshToken);
          console.log('🔑 Токены сохранены');
        }
        
        // Сохраняем данные пользователя
        const userData = data.data.user;
        console.log('💾 Сохраняем пользователя:', userData);
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Проверяем, что сохранилось
        const savedUser = localStorage.getItem('user');
        const savedToken = localStorage.getItem('accessToken');
        console.log('✅ Проверка сохранения:', { 
          user: JSON.parse(savedUser), 
          hasToken: !!savedToken 
        });
        
        setSuccessMessage(data.message);
        
        // Вызываем коллбек успешной авторизации
        onSuccess(userData);
      }
    } catch (error) {
      console.error('❌ Auth error:', error);
      setError(error.message || 'Произошла ошибка при авторизации');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    setError('');
    setSuccessMessage('');
  };

  // Функция для проверки email
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Валидация формы
  const validateForm = () => {
    if (!formData.email) {
      return 'Email обязателен';
    }
    
    if (!validateEmail(formData.email)) {
      return 'Неверный формат email';
    }
    
    if (!formData.password) {
      return 'Пароль обязателен';
    }
    
    if (!isLogin) {
      if (!formData.name) {
        return 'Имя обязательно';
      }
      
      if (formData.name.length < 2) {
        return 'Имя должно быть не менее 2 символов';
      }
      
      if (formData.password.length < 6) {
        return 'Пароль должен быть не менее 6 символов';
      }
      
      if (formData.password !== formData.confirmPassword) {
        return 'Пароли не совпадают';
      }
      
      if (!formData.agreeToTerms) {
        return 'Необходимо согласиться с условиями использования и политикой конфиденциальности';
      }
    }
    
    return null;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    
    handleSubmit(e);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!forgotPasswordEmail || !validateEmail(forgotPasswordEmail)) {
      setForgotPasswordMessage('Пожалуйста, введите корректный email');
      return;
    }

    setForgotPasswordLoading(true);
    setForgotPasswordMessage('');

    try {
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: forgotPasswordEmail })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setForgotPasswordMessage(`Инструкции по восстановлению пароля отправлены на ${forgotPasswordEmail}`);
        setForgotPasswordEmail('');
        
        setTimeout(() => {
          setShowForgotPasswordModal(false);
          setForgotPasswordMessage('');
        }, 3000);
      } else {
        throw new Error(data.message || 'Произошла ошибка при отправке запроса');
      }
    } catch (error) {
      setForgotPasswordMessage(error.message);
    } finally {
      setForgotPasswordLoading(false);
    }
  };

  // Модальное окно для восстановления пароля
  const ForgotPasswordModal = () => (
    <Modal isOpen={showForgotPasswordModal} onClose={() => setShowForgotPasswordModal(false)}>
      <div className="modal-header">
        <h3>Восстановление пароля</h3>
        <button 
          className="modal-close"
          onClick={() => setShowForgotPasswordModal(false)}
        >
          ✕
        </button>
      </div>
      
      <div className="modal-body">
        <p>Введите email, указанный при регистрации. Мы отправим вам инструкции по восстановлению пароля.</p>
        
        <form onSubmit={handleForgotPassword} className="forgot-password-form">
          <div className="form-group">
            <input
              type="email"
              value={forgotPasswordEmail}
              onChange={(e) => setForgotPasswordEmail(e.target.value)}
              placeholder="Ваш email"
              disabled={forgotPasswordLoading}
              className="modal-input"
              required
            />
          </div>
          
          {forgotPasswordMessage && (
            <div className={`forgot-message ${forgotPasswordMessage.includes('отправлены') ? 'success' : 'error'}`}>
              {forgotPasswordMessage}
            </div>
          )}
          
          <button 
            type="submit" 
            className="modal-submit-btn"
            disabled={forgotPasswordLoading || !forgotPasswordEmail}
          >
            {forgotPasswordLoading ? 'Отправка...' : 'Отправить инструкции'}
          </button>
        </form>
      </div>
    </Modal>
  );

  // Модальное окно для условий использования
  const TermsModal = () => (
    <Modal isOpen={showTermsModal} onClose={() => setShowTermsModal(false)}>
      <div className="modal-header">
        <h3>Пользовательское соглашение</h3>
        <button 
          className="modal-close"
          onClick={() => setShowTermsModal(false)}
        >
          ✕
        </button>
      </div>
      
      <div className="modal-content-scroll">
        <div className="modal-text-content">
          <h4>1. Общие положения</h4>
          <p>
            1.1. Настоящее Пользовательское соглашение (далее — Соглашение) регулирует отношения между
            художественной студией "ElArt" (далее — Студия) и пользователем (далее — Пользователь) сайта и услуг Студии.
          </p>
          
          <h4>2. Регистрация и аккаунт</h4>
          <p>
            2.1. Для доступа к некоторым функциям сайта необходимо зарегистрироваться, создав учетную запись.
          </p>
          <p>
            2.2. Пользователь обязуется предоставлять достоверную и полную информацию при регистрации.
          </p>
          <p>
            2.3. Пользователь несет ответственность за сохранность своих учетных данных.
          </p>
          
          <h4>3. Интеллектуальная собственность</h4>
          <p>
            3.1. Все материалы, представленные на сайте, включая уроки, изображения, тексты, являются
            интеллектуальной собственностью Студии.
          </p>
          <p>
            3.2. Запрещено копирование, распространение и использование материалов без письменного разрешения Студии.
          </p>
          
          <h4>4. Галерея работ</h4>
          <p>
            4.1. Пользователи могут публиковать свои работы в галерее.
          </p>
          <p>
            4.2. Студия оставляет за собой право удалять работы, нарушающие правила сообщества.
          </p>
          
          <h4>5. Ответственность</h4>
          <p>
            5.1. Студия не несет ответственности за качество интернет-соединения Пользователя.
          </p>
          <p>
            5.2. Пользователь самостоятельно несет ответственность за соблюдение авторских прав при публикации работ.
          </p>
          
          <h4>6. Изменения в соглашении</h4>
          <p>
            6.1. Студия оставляет за собой право изменять настоящее Соглашение. 
            Изменения вступают в силу с момента их публикации на сайте.
          </p>
          
          <div className="terms-footer">
            <p className="terms-note">
              Нажимая "Согласен", вы подтверждаете, что ознакомились и принимаете условия данного соглашения.
            </p>
            <button 
              className="modal-action-btn"
              onClick={() => {
                setFormData({...formData, agreeToTerms: true});
                setShowTermsModal(false);
              }}
            >
              Согласен с условиями
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );

  // Модальное окно для политики конфиденциальности
  const PrivacyModal = () => (
    <Modal isOpen={showPrivacyModal} onClose={() => setShowPrivacyModal(false)}>
      <div className="modal-header">
        <h3>Политика конфиденциальности</h3>
        <button 
          className="modal-close"
          onClick={() => setShowPrivacyModal(false)}
        >
          ✕
        </button>
      </div>
      
      <div className="modal-content-scroll">
        <div className="modal-text-content">
          <h4>1. Сбор информации</h4>
          <p>
            1.1. Мы собираем информацию, которую вы предоставляете при регистрации: имя, email, информацию о себе.
          </p>
          
          <h4>2. Использование информации</h4>
          <p>
            2.1. Ваши данные используются для:
          </p>
          <ul>
            <li>Предоставления доступа к урокам и материалам</li>
            <li>Персонализации вашего опыта обучения</li>
            <li>Отправки важных уведомлений</li>
            <li>Улучшения качества наших услуг</li>
          </ul>
          
          <h4>3. Защита данных</h4>
          <p>
            3.1. Мы принимаем все необходимые меры для защиты ваших персональных данных от несанкционированного доступа.
          </p>
          
          <h4>4. Галерея работ</h4>
          <p>
            4.1. Работы, которые вы публикуете в галерее, могут быть видны другим пользователям.
          </p>
          <p>
            4.2. Вы можете удалить свои работы в любое время.
          </p>
          
          <h4>5. Cookies</h4>
          <p>
            5.1. Мы используем cookies для улучшения работы сайта и анализа трафика.
          </p>
          
          <h4>6. Изменения в политике</h4>
          <p>
            6.1. Мы можем изменять данную политику. Актуальная версия всегда доступна на сайте.
          </p>
          
          <div className="contact-info">
            <p><strong>По вопросам конфиденциальности:</strong></p>
            <p>Email: privacy@elart-studio.ru</p>
          </div>
        </div>
      </div>
    </Modal>
  );

  // Компонент модального окна
  const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h2>{isLogin ? 'Вход в аккаунт' : 'Регистрация'}</h2>
          <p>
            {isLogin 
              ? 'Войдите, чтобы получить доступ ко всем урокам' 
              : 'Создайте аккаунт для начала обучения'}
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Имя *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ваше имя"
                disabled={isLoading}
                className={formData.name && formData.name.length < 2 ? 'error' : ''}
              />
              {formData.name && formData.name.length < 2 && (
                <small className="form-hint">Минимум 2 символа</small>
              )}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@mail.com"
              disabled={isLoading}
              className={formData.email && !validateEmail(formData.email) ? 'error' : ''}
            />
            {formData.email && !validateEmail(formData.email) && (
              <small className="form-hint">Неверный формат email</small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Пароль *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              disabled={isLoading}
              className={formData.password && formData.password.length < 6 ? 'error' : ''}
            />
            {formData.password && formData.password.length < 6 && (
              <small className="form-hint">Минимум 6 символов</small>
            )}
          </div>

          {!isLogin && (
            <>
              <div className="form-group">
                <label htmlFor="confirmPassword">Подтвердите пароль *</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  disabled={isLoading}
                  className={formData.confirmPassword && formData.password !== formData.confirmPassword ? 'error' : ''}
                />
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <small className="form-hint">Пароли не совпадают</small>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="bio">О себе (необязательно)</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Расскажите немного о себе и своих целях в рисовании..."
                  disabled={isLoading}
                  rows="3"
                />
                <small className="form-hint">Можно заполнить позже в профиле</small>
              </div>

              <div className="terms-section">
                <div className="terms-checkbox">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  <label htmlFor="agreeToTerms">
                    <em>При регистрации вы соглашаетесь с условиями использования и политикой конфиденциальности.</em>
                  </label>
                </div>
                
                <div className="terms-minimal-links">
                  <button 
                    type="button" 
                    className="minimal-link"
                    onClick={() => setShowTermsModal(true)}
                  >
                    Условия использования
                  </button>
                  <button 
                    type="button" 
                    className="minimal-link"
                    onClick={() => setShowPrivacyModal(true)}
                  >
                    Политика конфиденциальности
                  </button>
                </div>
                
                {formData.agreeToTerms && (
                  <div className="terms-accepted">
                    <span className="check-icon">✓</span>
                    Вы приняли условия использования
                  </div>
                )}
              </div>
            </>
          )}

          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          {successMessage && (
            <div className="success-message">
              <span className="success-icon">✅</span>
              {successMessage}
            </div>
          )}

          <button 
            type="submit" 
            className="auth-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading">
                <span className="spinner"></span>
                Загрузка...
              </span>
            ) : (
              isLogin ? 'Войти' : 'Зарегистрироваться'
            )}
          </button>

          <div className="auth-switch">
            <p>
              {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
              <button 
                type="button"
                className="switch-btn"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                  setSuccessMessage('');
                  setFormData({
                    email: formData.email,
                    password: '',
                    name: '',
                    confirmPassword: '',
                    bio: '',
                    agreeToTerms: false
                  });
                }}
                disabled={isLoading}
              >
                {isLogin ? 'Зарегистрироваться' : 'Войти'}
              </button>
            </p>
          </div>

          {isLogin && (
            <div className="auth-forgot">
             
            </div>
          )}
        </form>

        <div className="auth-back">
          <button 
            className="back-btn"
            onClick={() => navigateTo('home')}
            disabled={isLoading}
          >
            ← На главную
          </button>
        </div>
      </div>

      {showForgotPasswordModal && <ForgotPasswordModal />}
      {showTermsModal && <TermsModal />}
      {showPrivacyModal && <PrivacyModal />}
    </div>
  );
};

export default AuthPage;