const mongoose = require('mongoose');

const dosenSchema = new mongoose.Schema({
  NIY: {
    type:Number,
    required: true,
    unique: true
  },

  nama: {
    type: String,
    required: true
  },

  alamat: {
    type: String,
    required: true
  },

  jabatan: {
    type: String,
    required: true
  },
});

const DosenModel = mongoose.model('Dosen', dosenSchema);

module.exports = DosenModel;
