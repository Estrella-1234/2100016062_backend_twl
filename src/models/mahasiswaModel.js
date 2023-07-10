const mongoose = require('mongoose');

const mahasiswaSchema = new mongoose.Schema({
  NIM: {
    type: Number,
    required: true,
    unique: true
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
  },
  imageName: {
    type: String,
    required: true
  },

});

const MahasiswaModel = mongoose.model('Mahasiswa', mahasiswaSchema);

module.exports = MahasiswaModel;
