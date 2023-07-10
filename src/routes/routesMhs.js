const express = require('express');
const routerMhs = express.Router();
const { loggerMiddleware } = require('../middleware/middleware');
const { authenticateToken } = require('../middleware/authMiddleware');
const {
  getAllMahasiswa,
  createMahasiswa,
  deleteMahasiswa,
  editMahasiswa,
} = require('../controllers/mahasiswaController');


// Middleware
routerMhs.use(loggerMiddleware);

// Mahasiswa routes
routerMhs.get('/mahasiswa',authenticateToken , getAllMahasiswa);
routerMhs.post('/mahasiswa',authenticateToken , createMahasiswa);
routerMhs.delete('/mahasiswa/:id',authenticateToken , deleteMahasiswa);
routerMhs.put('/mahasiswa/:id',authenticateToken , editMahasiswa);

// Export the router
module.exports = routerMhs;

