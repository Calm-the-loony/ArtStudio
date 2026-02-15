const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const TokenUtils = require('../utils/tokenUtils');
const pool = require('../config/database');

class AuthController {
  // Регистрация
  static async register(req, res) {
    try {
      const { name, email, password, bio } = req.body;

      console.log('📝 Регистрация нового пользователя:', { email, name });

      const userExists = await User.exists(email);
      if (userExists) {
        console.log('❌ Пользователь уже существует:', email);
        return res.status(400).json({
          success: false,
          message: 'Пользователь с таким email уже существует'
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const userId = await User.create({
        name,
        email,
        password: hashedPassword,
        role: 'Ученик',
        avatar: '👤',
        bio: bio || ''
      });

      console.log('✅ Пользователь создан с ID:', userId);

      const user = await User.findById(userId);

      const accessToken = TokenUtils.generateAccessToken(user);
      const refreshToken = TokenUtils.generateRefreshToken(user);

      await TokenUtils.saveRefreshToken(user.id, refreshToken);

      console.log('🔑 Токены сгенерированы для пользователя:', user.id);

      res.status(201).json({
        success: true,
        message: 'Регистрация успешна! Добро пожаловать в школу искусств!',
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            bio: user.bio,
            created_at: user.created_at
          },
          tokens: {
            accessToken,
            refreshToken
          }
        }
      });
    } catch (error) {
      console.error('❌ Registration error:', error);
      res.status(500).json({
        success: false,
        message: 'Ошибка при регистрации. Пожалуйста, попробуйте еще раз.',
        error: error.message
      });
    }
  }

  // Вход
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      console.log('🔐 Попытка входа:', { email });

      const user = await User.findByEmail(email);
      if (!user) {
        console.log('❌ Пользователь не найден:', email);
        return res.status(401).json({
          success: false,
          message: 'Пользователь с таким email не найден'
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        console.log('❌ Неверный пароль для:', email);
        return res.status(401).json({
          success: false,
          message: 'Неверный пароль'
        });
      }

      console.log('✅ Пароль верный для:', email);

      const accessToken = TokenUtils.generateAccessToken(user);
      const refreshToken = TokenUtils.generateRefreshToken(user);

      await TokenUtils.saveRefreshToken(user.id, refreshToken);

      console.log('🔑 Токены сгенерированы для пользователя:', user.id);

      delete user.password;

      res.json({
        success: true,
        message: 'Вход выполнен успешно!',
        data: {
          user,
          tokens: {
            accessToken,
            refreshToken
          }
        }
      });
    } catch (error) {
      console.error('❌ Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Ошибка при входе. Пожалуйста, попробуйте еще раз.',
        error: error.message
      });
    }
  }

  // Обновление токенов
  static async refresh(req, res) {
    try {
      const { refreshToken } = req.body;

      console.log('🔄 Попытка обновления токена');

      if (!refreshToken) {
        console.log('❌ Refresh токен отсутствует');
        return res.status(400).json({
          success: false,
          message: 'Refresh токен обязателен'
        });
      }

      const tokens = await TokenUtils.refreshTokens(refreshToken);
      
      console.log('✅ Токены успешно обновлены');

      res.json({
        success: true,
        data: tokens
      });
    } catch (error) {
      console.error('❌ Ошибка обновления токена:', error);
      res.status(401).json({
        success: false,
        message: 'Сессия истекла. Пожалуйста, войдите снова.'
      });
    }
  }

  // Выход
  static async logout(req, res) {
    try {
      const { refreshToken } = req.body;

      console.log('🚪 Выход пользователя');

      if (refreshToken) {
        await TokenUtils.deleteRefreshToken(refreshToken);
        console.log('✅ Refresh токен удален');
      }

      res.json({
        success: true,
        message: 'Выход выполнен успешно'
      });
    } catch (error) {
      console.error('❌ Logout error:', error);
      res.status(500).json({
        success: false,
        message: 'Ошибка при выходе'
      });
    }
  }

  // Получение текущего пользователя
  static async getCurrentUser(req, res) {
    try {
      console.log('👤 Получение данных пользователя:', req.user.id);

      const user = await User.findById(req.user.id);
      
      if (!user) {
        console.log('❌ Пользователь не найден:', req.user.id);
        return res.status(404).json({
          success: false,
          message: 'Пользователь не найден'
        });
      }

      console.log('✅ Данные пользователя получены:', user.id);

      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      console.error('❌ Get user error:', error);
      res.status(500).json({
        success: false,
        message: 'Ошибка при получении данных пользователя'
      });
    }
  }

  // Обновление профиля
  static async updateProfile(req, res) {
    try {
      const { name, avatar, bio } = req.body;
      const userId = req.user.id;

      console.log('✏️ Обновление профиля пользователя:', userId);

      const updated = await User.update(userId, { name, avatar, bio });

      if (!updated) {
        console.log('❌ Пользователь не найден:', userId);
        return res.status(404).json({
          success: false,
          message: 'Пользователь не найден'
        });
      }

      const user = await User.findById(userId);
      console.log('✅ Профиль обновлен:', userId);

      res.json({
        success: true,
        message: 'Профиль успешно обновлен!',
        data: user
      });
    } catch (error) {
      console.error('❌ Update profile error:', error);
      res.status(500).json({
        success: false,
        message: 'Ошибка при обновлении профиля'
      });
    }
  }

  // Получение уроков пользователя
  static async getUserLessons(req, res) {
    try {
      const userId = req.user.id;
      console.log('📚 Получение уроков для пользователя:', userId);

      const lessons = await User.getUserLessons(userId);
      console.log(`✅ Найдено ${lessons.length} уроков для пользователя ${userId}`);
      
      res.json({
        success: true,
        data: lessons
      });
    } catch (error) {
      console.error('❌ Ошибка в getUserLessons:', error);
      res.status(500).json({
        success: false,
        message: 'Ошибка при получении уроков',
        error: error.message
      });
    }
  }

  // Запись на урок
  static async enrollInLesson(req, res) {
    try {
      const userId = req.user.id;
      const { lessonId } = req.body;

      console.log('📝 Запись на урок:', { userId, lessonId });

      if (!lessonId) {
        return res.status(400).json({
          success: false,
          message: 'ID урока обязателен'
        });
      }

      const enrollmentId = await User.enrollInLesson(userId, lessonId);
      console.log('✅ Пользователь записан на урок:', { userId, lessonId, enrollmentId });

      res.status(201).json({
        success: true,
        message: 'Вы успешно записались на урок!',
        data: { enrollmentId }
      });
    } catch (error) {
      console.error('❌ Ошибка в enrollInLesson:', error);
      if (error.message === 'Вы уже записаны на этот урок') {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
      res.status(500).json({
        success: false,
        message: 'Ошибка при записи на урок',
        error: error.message
      });
    }
  }

  // Обновление прогресса урока (ИСПРАВЛЕНО)
  static async updateLessonProgress(req, res) {
    try {
      const userId = req.user.id;
      const { lessonId, progress } = req.body;

      console.log('📥 ПОЛУЧЕН ЗАПРОС НА ОБНОВЛЕНИЕ ПРОГРЕССА:', {
        userId,
        lessonId,
        progress
      });

      if (!lessonId || progress === undefined) {
        return res.status(400).json({
          success: false,
          message: 'ID урока и прогресс обязательны'
        });
      }

      // ПРЯМОЙ SQL ЗАПРОС - ТАК ЖЕ КАК В ТЕСТЕ
      const [result] = await pool.execute(
        'INSERT INTO user_lessons (user_id, lesson_id, progress, completed) VALUES (?, ?, ?, ?)',
        [userId, lessonId, progress, progress === 100]
      );

      console.log('✅ Результат вставки:', result);

      res.json({
        success: true,
        message: progress === 100 ? 'Курс отмечен как пройденный!' : 'Прогресс обновлен',
        data: {
          lessonId,
          progress,
          completed: progress === 100
        }
      });

    } catch (error) {
      console.error('❌ ОШИБКА:', error);
      
      // Если ошибка дубликата - пробуем обновить
      if (error.code === 'ER_DUP_ENTRY') {
        try {
          const [updateResult] = await pool.execute(
            'UPDATE user_lessons SET progress = ?, completed = ? WHERE user_id = ? AND lesson_id = ?',
            [progress, progress === 100, userId, lessonId]
          );
          
          console.log('✅ Обновление существующей записи:', updateResult);
          
          return res.json({
            success: true,
            message: progress === 100 ? 'Курс отмечен как пройденный!' : 'Прогресс обновлен',
            data: {
              lessonId,
              progress,
              completed: progress === 100
            }
          });
        } catch (updateError) {
          console.error('❌ Ошибка обновления:', updateError);
        }
      }
      
      res.status(500).json({
        success: false,
        message: 'Ошибка при обновлении прогресса: ' + error.message
      });
    }
  }

  // Получение артворков пользователя
  static async getUserArtworks(req, res) {
    try {
      const userId = req.user.id;
      console.log('🖼️ Получение работ пользователя:', userId);

      const artworks = await User.getUserArtworks(userId);
      console.log(`✅ Найдено ${artworks.length} работ для пользователя ${userId}`);

      res.json({
        success: true,
        data: artworks
      });
    } catch (error) {
      console.error('❌ Ошибка в getUserArtworks:', error);
      res.status(500).json({
        success: false,
        message: 'Ошибка при получении работ',
        error: error.message
      });
    }
  }

  // Добавление артворка
  static async addArtwork(req, res) {
    try {
      const userId = req.user.id;
      const { title, description, image_url, lesson_id } = req.body;

      console.log('➕ Добавление работы пользователем:', { userId, title, lesson_id });

      const artworkId = await User.addArtwork(userId, {
        title,
        description,
        image_url,
        lesson_id
      });

      console.log('✅ Работа добавлена с ID:', artworkId);

      res.status(201).json({
        success: true,
        message: 'Работа успешно добавлена в галерею!',
        data: { artworkId }
      });
    } catch (error) {
      console.error('❌ Ошибка в addArtwork:', error);
      res.status(500).json({
        success: false,
        message: 'Ошибка при добавлении работы',
        error: error.message
      });
    }
  }
}

module.exports = AuthController;