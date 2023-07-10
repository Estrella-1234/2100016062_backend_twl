const express = require('express');
const router = express.Router();
const { loggerMiddleware } = require('../middleware/middleware');
const { authenticateToken } = require('../middleware/authMiddleware');
const { 
  registerUser, 
  loginUser,
  checkTokenValidity,
  getUserById,
  editUser
} = require('../controllers/authController');


// Middleware
router.use(loggerMiddleware);

// User registration route
router.post('/register', registerUser);

// User login route
router.post('/login', loginUser);

// Check token validity route
router.post('/check-token', authenticateToken, checkTokenValidity);

// Get user manipulation
router.get('/user/:id', authenticateToken, getUserById);
router.put('/user/:id', authenticateToken, editUser)


// Export the router
module.exports = router;

