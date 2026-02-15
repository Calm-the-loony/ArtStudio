const { body, validationResult } = require('express-validator');

// Валидация регистрации
const validateRegistration = [
  body('name')
    .notEmpty().withMessage('Имя обязательно')
    .isLength({ min: 2, max: 50 }).withMessage('Имя должно содержать от 2 до 50 символов')
    .trim()
    .escape(),
  body('email')
    .notEmpty().withMessage('Email обязателен')
    .isEmail().withMessage('Некорректный email')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Пароль обязателен')
    .isLength({ min: 6 }).withMessage('Пароль должен содержать минимум 6 символов')
];

// Валидация входа
const validateLogin = [
  body('email')
    .notEmpty().withMessage('Email обязателен')
    .isEmail().withMessage('Некорректный email')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Пароль обязателен')
];

// Валидация обновления профиля
const validateUpdateProfile = [
  body('name')
    .optional()
    .isLength({ min: 2, max: 50 }).withMessage('Имя должно содержать от 2 до 50 символов')
    .trim()
    .escape(),
  body('bio')
    .optional()
    .isLength({ max: 500 }).withMessage('Биография не должна превышать 500 символов')
    .trim()
    .escape(),
  body('avatar')
    .optional()
    .isLength({ max: 10 }).withMessage('Аватар должен быть не длиннее 10 символов')
    .trim()
    .escape()
];

// Обработка ошибок валидации
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Ошибка валидации',
      errors: errors.array()
    });
  }
  next();
};

module.exports = {
  validateRegistration,
  validateLogin,
  validateUpdateProfile,
  handleValidation
};