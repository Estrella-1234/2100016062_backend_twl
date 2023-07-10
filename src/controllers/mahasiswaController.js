const fs = require('fs');
const path = require('path');
const MahasiswaModel = require('../models/mahasiswaModel');

exports.getAllMahasiswa = async (req, res) => {
  try {
    const mahasiswaList = await MahasiswaModel.find();
    res.json(mahasiswaList);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving mahasiswa' });
  }
};

exports.createMahasiswa = async (req, res) => {
  const { NIM, Nama, email, alamat, imageName } = req.body;

  try {
    // Periksa apakah NIM sudah terdaftar sebelumnya
    const existingMahasiswa = await MahasiswaModel.findOne({ NIM });
    if (existingMahasiswa) {
      return res.status(400).json({ message: 'NIM telah terdaftar' });
    }

    const newMahasiswa = new MahasiswaModel({ NIM, Nama, email, alamat, imageName });
    const savedMahasiswa = await newMahasiswa.save();
    res.status(201).json(savedMahasiswa);
  } catch (error) {
    res.status(500).json({ message: 'Error creating mahasiswa', error: error.message });
  }
};


exports.deleteMahasiswa = async (req, res) => {
  const { id } = req.params;

  try {
    const mahasiswa = await MahasiswaModel.findById(id);
    if (!mahasiswa) {
      return res.status(404).json({ message: 'Mahasiswa not found' });
    }

    // Delete the associated image file
    if (mahasiswa.imageName) {
      const imagePath = path.join(__dirname, '..', 'uploads/img', mahasiswa.imageName);
      fs.unlinkSync(imagePath);
    }

    await MahasiswaModel.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting mahasiswa' });
  }
};

exports.editMahasiswa = async (req, res) => {
  const { id } = req.params;
  const { Nama, email, alamat, imageName } = req.body;

  try {
    let updatedMahasiswa = { Nama, email, alamat };

    if (imageName) {
      // If the imageName is provided, update it as well
      updatedMahasiswa = { ...updatedMahasiswa, imageName };

      // Find the existing Mahasiswa to get the old image name
      const existingMahasiswa = await MahasiswaModel.findById(id);

      // Delete the old image file if it exists
      if (existingMahasiswa.imageName) {
        const imagePath = path.join(__dirname, '..', 'uploads/img', existingMahasiswa.imageName);
        fs.unlinkSync(imagePath); // Remove the file from disk
      }
    }

    const updatedData = await MahasiswaModel.findByIdAndUpdate(
      id,
      updatedMahasiswa,
      { new: true }
    );

    res.json(updatedData);
  } catch (error) {
    res.status(500).json({ message: 'Error editing mahasiswa' });
  }
};

