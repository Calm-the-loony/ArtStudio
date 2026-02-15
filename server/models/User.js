const pool = require('../config/database');

class User {
  // Создание нового пользователя
  static async create(userData) {
    const { name, email, password, role, avatar, bio } = userData;
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password, role, avatar, bio) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, password, role || 'Ученик', avatar || '👤', bio || '']
    );
    return result.insertId;
  }

  // Поиск пользователя по email
  static async findByEmail(email) {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ? AND is_active = TRUE',
      [email]
    );
    return rows[0];
  }

  // Поиск пользователя по ID
  static async findById(id) {
    const [rows] = await pool.execute(
      'SELECT id, name, email, role, avatar, bio, created_at FROM users WHERE id = ? AND is_active = TRUE',
      [id]
    );
    return rows[0];
  }

  // Обновление пользователя
  static async update(id, userData) {
    const { name, avatar, bio } = userData;
    const [result] = await pool.execute(
      'UPDATE users SET name = ?, avatar = ?, bio = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [name, avatar, bio, id]
    );
    return result.affectedRows > 0;
  }

  // Проверка существования пользователя по email
  static async exists(email) {
    const [rows] = await pool.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );
    return rows.length > 0;
  }

  // Получение всех пользователей
  static async getAll(limit = 50, offset = 0) {
    const [rows] = await pool.execute(
      'SELECT id, name, email, role, avatar, bio, created_at FROM users WHERE is_active = TRUE ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [limit, offset]
    );
    return rows;
  }

  // Получение уроков пользователя (ИСПРАВЛЕНО)
  static async getUserLessons(userId) {
    console.log('📚 Получение уроков для пользователя:', userId);
    
    try {
      // Получаем все уроки
      const [lessons] = await pool.execute('SELECT * FROM lessons');
      
      // Получаем прогресс пользователя
      const [userLessons] = await pool.execute(
        'SELECT * FROM user_lessons WHERE user_id = ?',
        [userId]
      );

      console.log('📊 Прогресс пользователя из БД:', userLessons);

      const result = lessons.map(lesson => {
        const userLesson = userLessons.find(ul => ul.lesson_id === lesson.id);
        
        return {
          id: lesson.id,
          title: lesson.title,
          description: lesson.description,
          category: lesson.category,
          level: lesson.level,
          duration: lesson.duration,
          price: lesson.price,
          type: lesson.type,
          image_color: lesson.image_color,
          progress: userLesson ? userLesson.progress : 0,
          completed: userLesson ? userLesson.completed === 1 : false,
          enrolled_at: userLesson ? userLesson.enrolled_at : null
        };
      });

      console.log('✅ Завершенные уроки:', result.filter(l => l.completed).map(l => l.title));
      
      return result;
    } catch (error) {
      console.error('❌ Ошибка в getUserLessons:', error);
      return [];
    }
  }

  // Запись на урок
  static async enrollInLesson(userId, lessonId) {
    console.log('📝 Запись на урок:', { userId, lessonId });
    
    try {
      // Проверяем, существует ли уже запись
      const [existing] = await pool.execute(
        'SELECT id FROM user_lessons WHERE user_id = ? AND lesson_id = ?',
        [userId, lessonId]
      );

      if (existing.length > 0) {
        console.log('⚠️ Пользователь уже записан на этот урок');
        return existing[0].id;
      }

      const [result] = await pool.execute(
        'INSERT INTO user_lessons (user_id, lesson_id, progress, completed) VALUES (?, ?, ?, ?)',
        [userId, lessonId, 0, false]
      );
      
      console.log('✅ Успешная запись на урок, ID записи:', result.insertId);
      return result.insertId;
    } catch (error) {
      console.error('❌ Ошибка в enrollInLesson:', error);
      throw error;
    }
  }

  // Обновление прогресса урока (ИСПРАВЛЕНО - УПРОЩЕНО)
  static async updateLessonProgress(userId, lessonId, progress) {
    console.log('📊 Обновление прогресса:', { userId, lessonId, progress });
    
    try {
      const completed = progress === 100;
      
      const [result] = await pool.execute(
        'INSERT INTO user_lessons (user_id, lesson_id, progress, completed) VALUES (?, ?, ?, ?)',
        [userId, lessonId, progress, completed]
      );
      
      console.log('✅ Прогресс успешно обновлен:', result);
      return true;
    } catch (error) {
      // Если ошибка дубликата - обновляем
      if (error.code === 'ER_DUP_ENTRY') {
        try {
          const [updateResult] = await pool.execute(
            'UPDATE user_lessons SET progress = ?, completed = ? WHERE user_id = ? AND lesson_id = ?',
            [progress, progress === 100, userId, lessonId]
          );
          console.log('✅ Существующая запись обновлена:', updateResult);
          return true;
        } catch (updateError) {
          console.error('❌ Ошибка обновления:', updateError);
          return false;
        }
      }
      console.error('❌ Ошибка в updateLessonProgress:', error);
      return false;
    }
  }

  // Получение артворков пользователя
  static async getUserArtworks(userId) {
    console.log('🖼️ Получение работ пользователя:', userId);
    
    try {
      const [rows] = await pool.execute(
        `SELECT a.*, l.title as lesson_title 
         FROM user_artworks a 
         LEFT JOIN lessons l ON a.lesson_id = l.id 
         WHERE a.user_id = ? 
         ORDER BY a.created_at DESC`,
        [userId]
      );
      
      console.log(`✅ Найдено ${rows.length} работ для пользователя ${userId}`);
      return rows;
    } catch (error) {
      console.error('❌ Ошибка в getUserArtworks:', error);
      return [];
    }
  }

  // Добавление артворка
  static async addArtwork(userId, artworkData) {
    const { title, description, image_url, lesson_id } = artworkData;
    console.log('➕ Добавление работы:', { userId, title, lesson_id });
    
    try {
      const [result] = await pool.execute(
        'INSERT INTO user_artworks (user_id, title, description, image_url, lesson_id) VALUES (?, ?, ?, ?, ?)',
        [userId, title, description, image_url, lesson_id]
      );
      
      console.log('✅ Работа добавлена с ID:', result.insertId);
      return result.insertId;
    } catch (error) {
      console.error('❌ Ошибка в addArtwork:', error);
      throw error;
    }
  }
}

module.exports = User;