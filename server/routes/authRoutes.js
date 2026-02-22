const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/refresh', AuthController.refresh);
router.post('/logout', AuthController.logout);

// Защищенные маршруты
router.get('/me', authMiddleware.authenticateToken, AuthController.getCurrentUser);
router.put('/profile', authMiddleware.authenticateToken, AuthController.updateProfile);
router.get('/my-lessons', authMiddleware.authenticateToken, AuthController.getUserLessons);
router.post('/enroll', authMiddleware.authenticateToken, AuthController.enrollInLesson);
router.post('/update-progress', authMiddleware.authenticateToken, AuthController.updateLessonProgress);
router.get('/my-artworks', authMiddleware.authenticateToken, AuthController.getUserArtworks);
router.post('/add-artwork', authMiddleware.authenticateToken, AuthController.addArtwork);

module.exports = router;