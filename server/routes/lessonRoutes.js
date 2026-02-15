const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const jwt = require('jsonwebtoken');

// Middleware для проверки авторизации
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Требуется авторизация' 
    });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ 
      success: false, 
      message: 'Недействительный токен' 
    });
  }
};

// Получить все уроки
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM lessons ORDER BY id');
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error fetching lessons:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при получении уроков'
    });
  }
});

// Получить популярные уроки (первые 6)
router.get('/popular', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM lessons ORDER BY id LIMIT 6');
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error fetching popular lessons:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при получении популярных уроков'
    });
  }
});

// Получить урок по ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM lessons WHERE id = ?', [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Урок не найден'
      });
    }
    
    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Error fetching lesson:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при получении урока'
    });
  }
});

// Получить уроки по типу (online/video)
router.get('/type/:type', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM lessons WHERE type = ?', [req.params.type]);
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error fetching lessons by type:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при получении уроков'
    });
  }
});

// Получить уроки по уровню
router.get('/level/:level', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM lessons WHERE level = ?', [req.params.level]);
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error fetching lessons by level:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при получении уроков'
    });
  }
});

// Получить уроки по категории
router.get('/category/:category', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM lessons WHERE category = ?', [req.params.category]);
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error fetching lessons by category:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при получении уроков'
    });
  }
});

// Отметить курс как пройденный
router.post('/complete', authenticateToken, async (req, res) => {
  try {
    const { lessonId, completed } = req.body;
    const userId = req.user.id;

    console.log('Marking lesson as completed:', { userId, lessonId, completed });

    // Проверяем существование урока
    const [lesson] = await pool.query('SELECT * FROM lessons WHERE id = ?', [lessonId]);
    if (lesson.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Урок не найден'
      });
    }

    // Создаем таблицу user_progress если она не существует
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_progress (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        lesson_id INT NOT NULL,
        completed BOOLEAN DEFAULT FALSE,
        completed_at DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE,
        UNIQUE KEY unique_user_lesson (user_id, lesson_id),
        INDEX idx_user_completed (user_id, completed)
      )
    `);

    // Обновляем статус в БД
    await pool.query(
      `INSERT INTO user_progress (user_id, lesson_id, completed, completed_at) 
       VALUES (?, ?, ?, NOW())
       ON DUPLICATE KEY UPDATE completed = ?, completed_at = NOW()`,
      [userId, lessonId, completed, completed]
    );

    // Получаем обновленную статистику пользователя
    const [completedCount] = await pool.query(
      `SELECT COUNT(*) as count FROM user_progress 
       WHERE user_id = ? AND completed = true`,
      [userId]
    );

    // Получаем навыки пользователя (группировка по категориям)
    const [skills] = await pool.query(
      `SELECT l.category, COUNT(*) as count 
       FROM user_progress up
       JOIN lessons l ON up.lesson_id = l.id
       WHERE up.user_id = ? AND up.completed = true
       GROUP BY l.category`,
      [userId]
    );

    // Формируем объект навыков для фронтенда
    const skillsMap = {
      'Рисунок': { level: 0, courses: 0 },
      'Живопись': { level: 0, courses: 0 },
      'Акварель': { level: 0, courses: 0 },
      'Масло': { level: 0, courses: 0 },
      'Пастель': { level: 0, courses: 0 },
      'Графика': { level: 0, courses: 0 },
      'Скетчинг': { level: 0, courses: 0 }
    };

    skills.forEach(skill => {
      if (skillsMap[skill.category]) {
        skillsMap[skill.category].courses = skill.count;
        skillsMap[skill.category].level = Math.min(skill.count, 5);
      }
    });

    res.json({
      success: true,
      data: {
        completedCount: completedCount[0].count,
        skills: skillsMap
      }
    });
  } catch (error) {
    console.error('Error marking lesson as completed:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка при отметке курса',
      error: error.message 
    });
  }
});

// Получить прогресс пользователя по всем урокам
router.get('/user/progress', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    // Получаем все уроки с прогрессом пользователя
    const [progress] = await pool.query(
      `SELECT l.*, 
              COALESCE(up.completed, false) as completed,
              up.completed_at,
              up.created_at as started_at
       FROM lessons l
       LEFT JOIN user_progress up ON l.id = up.lesson_id AND up.user_id = ?
       ORDER BY l.id`,
      [userId]
    );

    // Получаем статистику по категориям
    const [stats] = await pool.query(
      `SELECT 
         COUNT(DISTINCT l.id) as total_lessons,
         SUM(CASE WHEN up.completed THEN 1 ELSE 0 END) as completed_lessons,
         SUM(CASE WHEN l.type = 'video' THEN 1 ELSE 0 END) as video_lessons
       FROM lessons l
       LEFT JOIN user_progress up ON l.id = up.lesson_id AND up.user_id = ?`,
      [userId]
    );

    res.json({
      success: true,
      data: {
        lessons: progress,
        stats: stats[0]
      }
    });
  } catch (error) {
    console.error('Error fetching user progress:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при получении прогресса пользователя'
    });
  }
});

// Получить достижения пользователя
router.get('/user/achievements', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    // Получаем количество пройденных курсов
    const [completed] = await pool.query(
      `SELECT COUNT(*) as count FROM user_progress 
       WHERE user_id = ? AND completed = true`,
      [userId]
    );

    const totalCompleted = completed[0].count;
    
    // Формируем достижения на основе количества пройденных курсов
    const achievements = [];
    
    if (totalCompleted >= 1) {
      achievements.push({
        id: 1,
        name: 'Первый шаг',
        icon: '🌟',
        description: 'Пройден первый курс',
        earned: true
      });
    }
    
    if (totalCompleted >= 5) {
      achievements.push({
        id: 2,
        name: 'Начинающий художник',
        icon: '🎨',
        description: 'Пройдено 5 курсов',
        earned: true
      });
    }
    
    if (totalCompleted >= 10) {
      achievements.push({
        id: 3,
        name: 'Опытный творец',
        icon: '🏆',
        description: 'Пройдено 10 курсов',
        earned: true
      });
    }
    
    if (totalCompleted >= 20) {
      achievements.push({
        id: 4,
        name: 'Мастер кисти',
        icon: '👑',
        description: 'Пройдено 20 курсов',
        earned: true
      });
    }

    // Получаем навыки по категориям
    const [skills] = await pool.query(
      `SELECT l.category, COUNT(*) as count 
       FROM user_progress up
       JOIN lessons l ON up.lesson_id = l.id
       WHERE up.user_id = ? AND up.completed = true
       GROUP BY l.category`,
      [userId]
    );

    res.json({
      success: true,
      data: {
        achievements,
        skills,
        totalCompleted
      }
    });
  } catch (error) {
    console.error('Error fetching achievements:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при получении достижений'
    });
  }
});

module.exports = router;