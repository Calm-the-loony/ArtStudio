// Простая валидация без express-validator
const validateRegistration = (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  const errors = [];

  if (!name || name.length < 2) {
    errors.push({ field: 'name', message: 'Имя должно быть не менее 2 символов' });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push({ field: 'email', message: 'Неверный формат email' });
  }

  if (!password || password.length < 6) {
    errors.push({ field: 'password', message: 'Пароль должен быть не менее 6 символов' });
  }

  if (password !== confirmPassword) {
    errors.push({ field: 'confirmPassword', message: 'Пароли не совпадают' });
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push({ field: 'email', message: 'Неверный формат email' });
  }

  if (!password) {
    errors.push({ field: 'password', message: 'Пароль обязателен' });
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors
    });
  }

  next();
};

const validateUpdateProfile = (req, res, next) => {
  const { name, bio } = req.body;
  const errors = [];

  if (name && name.length < 2) {
    errors.push({ field: 'name', message: 'Имя должно быть не менее 2 символов' });
  }

  if (bio && bio.length > 500) {
    errors.push({ field: 'bio', message: 'Биография не должна превышать 500 символов' });
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors
    });
  }

  next();
};

module.exports = {
  validateRegistration,
  validateLogin,
  validateUpdateProfile
};