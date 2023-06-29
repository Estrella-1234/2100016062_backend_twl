const express = require('express');
const router = express.Router();
const { loggerMiddleware } = require('./middleware/middleware');
const { authenticateToken } = require('./middleware/authMiddleware');
const {
  getAllDosen,
  createDosen,
  deleteDosen,
  editDosen,
} = require('./controllers/dosenController');
const {
  getAllMahasiswa,
  createMahasiswa,
  deleteMahasiswa,
  editMahasiswa,
} = require('./controllers/mahasiswaController');
const { 
  registerUser, 
  loginUser,
  checkTokenValidity,
  getUserById,
  editUser
} = require('./controllers/authController');


// Middleware
router.use(loggerMiddleware);

// Dosen routes
router.get('/dosen',authenticateToken , getAllDosen);
router.post('/dosen',authenticateToken , createDosen);
router.delete('/dosen/:id',authenticateToken , deleteDosen);
router.put('/dosen/:id',authenticateToken , editDosen);


// Mahasiswa routes
router.get('/mahasiswa',authenticateToken , getAllMahasiswa);
router.post('/mahasiswa',authenticateToken , createMahasiswa);
router.delete('/mahasiswa/:id',authenticateToken , deleteMahasiswa);
router.put('/mahasiswa/:id',authenticateToken , editMahasiswa);


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

