const mongoose = require('mongoose');

const mahasiswaSchema = new mongoose.Schema({
  Nim: {
    type: Number,
    required: true,
    unique: true
  },

  imageName: {
    type: String,
    required: true
  },

  Nama: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  alamat: {
    type: String,
    required: true
  }
});

const MahasiswaModel = mongoose.model('Mahasiswa', mahasiswaSchema);

module.exports = MahasiswaModel;
