const express = require('express');
const routerDsn = express.Router();
const { loggerMiddleware } = require('../middleware/middleware');
const { authenticateToken } = require('../middleware/authMiddleware');
const {
  getAllDosen,
  createDosen,
  deleteDosen,
  editDosen,
} = require('../controllers/dosenController');


// Middleware
routerDsn.use(loggerMiddleware);

// Dosen routes
routerDsn.get('/dosen',authenticateToken , getAllDosen);
routerDsn.post('/dosen',authenticateToken , createDosen);
routerDsn.delete('/dosen/:id',authenticateToken , deleteDosen);
routerDsn.put('/dosen/:id',authenticateToken , editDosen);

// Export the routerDsn
module.exports = routerDsn;

