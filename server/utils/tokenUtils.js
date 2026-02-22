
const jwt = require('jsonwebtoken');
const pool = require('../config/database');

class TokenUtils {
  static generateAccessToken(user) {
    console.log('🔑 Генерация access токена для пользователя:', user.id);
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_ACCESS_SECRET || 'your-access-secret-key',
      { expiresIn: process.env.JWT_ACCESS_EXPIRE || '15m' }
    );
  }

  // Генерация refresh токена
  static generateRefreshToken(user) {
    console.log('🔄 Генерация refresh токена для пользователя:', user.id);
    return jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key',
      { expiresIn: process.env.JWT_REFRESH_EXPIRE || '7d' }
    );
  }

  // Верификация access токена
  static verifyAccessToken(token) {
    try {
      console.log('🔍 Проверка access токена...');
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET || 'your-access-secret-key');
      console.log('✅ Access токен валидный для пользователя:', decoded.id);
      return decoded;
    } catch (error) {
      console.log('❌ Ошибка проверки access токена:', error.message);
      return null;
    }
  }

  // Верификация refresh токена
  static verifyRefreshToken(token) {
    try {
      console.log('🔄 Проверка refresh токена...');
      const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key');
      console.log('✅ Refresh токен валидный для пользователя:', decoded.id);
      return decoded;
    } catch (error) {
      console.log('❌ Ошибка проверки refresh токена:', error.message);
      return null;
    }
  }

  // Сохранение refresh токена в базу данных
  static async saveRefreshToken(userId, token) {
    console.log('💾 Сохранение refresh токена для пользователя:', userId);
    
    try {
      // Создаем таблицу если не существует
      await pool.query(`
        CREATE TABLE IF NOT EXISTS refresh_tokens (
          id INT PRIMARY KEY AUTO_INCREMENT,
          user_id INT NOT NULL,
          token VARCHAR(500) NOT NULL,
          expires_at DATETIME NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
          UNIQUE KEY unique_token (token)
        )
      `);

      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);

      // Удаляем старые токены пользователя
      await pool.execute(
        'DELETE FROM refresh_tokens WHERE user_id = ?',
        [userId]
      );

      // Сохраняем новый токен
      await pool.execute(
        'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)',
        [userId, token, expiresAt]
      );

      console.log('✅ Refresh токен сохранен');
    } catch (error) {
      console.error('❌ Ошибка сохранения refresh токена:', error);
      throw error;
    }
  }

  // Проверка refresh токена в базе данных
  static async verifyRefreshTokenInDB(token) {
    try {
      console.log('🔍 Проверка refresh токена в БД...');
      const [rows] = await pool.execute(
        'SELECT * FROM refresh_tokens WHERE token = ? AND expires_at > NOW()',
        [token]
      );
      
      if (rows.length > 0) {
        console.log('✅ Refresh токен найден в БД');
        return rows[0];
      } else {
        console.log('❌ Refresh токен не найден в БД или истек');
        return null;
      }
    } catch (error) {
      console.error('❌ Ошибка проверки refresh токена в БД:', error);
      return null;
    }
  }

  // Удаление refresh токена
  static async deleteRefreshToken(token) {
    try {
      console.log('🗑️ Удаление refresh токена...');
      await pool.execute(
        'DELETE FROM refresh_tokens WHERE token = ?',
        [token]
      );
      console.log('✅ Refresh токен удален');
    } catch (error) {
      console.error('❌ Ошибка удаления refresh токена:', error);
    }
  }

  // Удаление всех токенов пользователя
  static async deleteAllUserTokens(userId) {
    try {
      console.log('🗑️ Удаление всех токенов пользователя:', userId);
      await pool.execute(
        'DELETE FROM refresh_tokens WHERE user_id = ?',
        [userId]
      );
      console.log('✅ Все токены пользователя удалены');
    } catch (error) {
      console.error('❌ Ошибка удаления токенов:', error);
    }
  }

  // Обновление токенов
  static async refreshTokens(oldRefreshToken) {
    console.log('🔄 Попытка обновления токенов...');
    
    try {
      // Проверяем токен в БД
      const tokenInDB = await this.verifyRefreshTokenInDB(oldRefreshToken);
      if (!tokenInDB) {
        console.log('❌ Refresh токен не найден в БД или истек');
        throw new Error('Невалидный refresh токен');
      }

      // Верифицируем токен
      const decoded = this.verifyRefreshToken(oldRefreshToken);
      if (!decoded) {
        console.log('❌ Невалидная подпись refresh токена');
        await this.deleteRefreshToken(oldRefreshToken);
        throw new Error('Невалидный refresh токен');
      }

      // Удаляем старый токен
      await this.deleteRefreshToken(oldRefreshToken);

      // Получаем пользователя из БД
      const [users] = await pool.execute(
        'SELECT id, email, role FROM users WHERE id = ? AND is_active = TRUE',
        [decoded.id]
      );

      if (users.length === 0) {
        console.log('❌ Пользователь не найден:', decoded.id);
        throw new Error('Пользователь не найден');
      }

      const user = users[0];
      console.log('✅ Пользователь найден, генерируем новые токены:', user.id);

      // Генерируем новые токены
      const newAccessToken = this.generateAccessToken(user);
      const newRefreshToken = this.generateRefreshToken(user);

      // Сохраняем новый refresh токен
      await this.saveRefreshToken(user.id, newRefreshToken);

      console.log('✅ Токены успешно обновлены');
      
      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
      };
    } catch (error) {
      console.error('❌ Ошибка обновления токенов:', error);
      throw error;
    }
  }

  // Получение пользователя по токену
  static async getUserFromToken(token) {
    try {
      const decoded = this.verifyAccessToken(token);
      if (!decoded) return null;

      const [users] = await pool.execute(
        'SELECT id, name, email, role, avatar, bio, created_at FROM users WHERE id = ? AND is_active = TRUE',
        [decoded.id]
      );

      return users[0] || null;
    } catch (error) {
      console.error('❌ Ошибка получения пользователя из токена:', error);
      return null;
    }
  }
}

module.exports = TokenUtils;