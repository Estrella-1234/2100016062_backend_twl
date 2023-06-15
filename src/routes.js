const express = require('express');
const router = express.Router();
const { loggerMiddleware } = require('./middleware');
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

// Middleware
router.use(loggerMiddleware);

// Dosen routes
router.get('/dosen', getAllDosen);
router.post('/dosen', createDosen);
router.delete('/dosen/:id', deleteDosen);
router.put('/dosen/:id', editDosen);


// Mahasiswa routes
router.get('/mahasiswa', getAllMahasiswa);
router.post('/mahasiswa', createMahasiswa);
router.delete('/mahasiswa/:id', deleteMahasiswa);
router.put('/mahasiswa/:id', editMahasiswa);


module.exports = router;
