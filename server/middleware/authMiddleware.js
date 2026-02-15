// server/middleware/authMiddleware.js
const TokenUtils = require('../utils/tokenUtils');

const authMiddleware = {
  authenticateToken: (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log('🔍 Auth middleware - проверка токена:', { 
      hasToken: !!token
    });

    if (!token) {
      console.log('❌ Токен доступа отсутствует');
      return res.status(401).json({
        success: false,
        message: 'Токен доступа отсутствует'
      });
    }

    const decoded = TokenUtils.verifyAccessToken(token);
    
    if (!decoded) {
      console.log('❌ Невалидный или просроченный токен');
      return res.status(403).json({
        success: false,
        message: 'Невалидный или просроченный токен'
      });
    }

    console.log('✅ Токен валидный, пользователь:', decoded.id);
    req.user = decoded;
    next();
  }
};

module.exports = authMiddleware;