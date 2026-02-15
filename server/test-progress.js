// server/test-progress.js
const mysql = require('mysql2');
require('dotenv').config();

// Прямое подключение к БД
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'art',
  port: process.env.DB_PORT || 3306
}).promise();

async function test() {
  try {
    console.log('🔍 Тестирование подключения к БД...');
    
    // Проверяем пользователя
    const [users] = await pool.execute('SELECT * FROM users WHERE id = 6');
    console.log('✅ Пользователь найден:', users[0]);
    
    // Проверяем уроки
    const [lessons] = await pool.execute('SELECT * FROM lessons LIMIT 1');
    console.log('✅ Урок найден:', lessons[0]);
    
    // Пробуем вставить запись
    const lessonId = lessons[0].id;
    console.log('📝 Пробуем вставить запись для user_id=6, lesson_id=' + lessonId);
    
    const [result] = await pool.execute(
      `INSERT INTO user_lessons (user_id, lesson_id, progress, completed) 
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE 
       progress = VALUES(progress), 
       completed = VALUES(completed)`,
      [6, lessonId, 100, true]
    );
    
    console.log('✅ Результат вставки:', result);
    
    // Проверяем, что вставилось
    const [check] = await pool.execute(
      'SELECT * FROM user_lessons WHERE user_id = 6'
    );
    console.log('📊 Записи в user_lessons:', check);
    
  } catch (error) {
    console.error('❌ Ошибка:', error);
  } finally {
    process.exit();
  }
}

test();