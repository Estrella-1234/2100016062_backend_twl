const DosenModel = require('../models/dosenModel');

exports.getAllDosen = async (req, res) => {
  try {
    const dosenList = await DosenModel.find();
    res.json(dosenList);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving dosen' });
  }
};

exports.createDosen = async (req, res) => {
  const { NIY, nama, alamat, jabatan } = req.body;

  try {
    const existingDosen = await DosenModel.findOne({ NIY });
    if (existingDosen) {
      return res.status(400).json({ message: 'NIY telah terdaftar' });
    }
    
    const newDosen = new DosenModel({ NIY, nama, alamat, jabatan });
    const savedDosen = await newDosen.save();
    res.status(201).json(savedDosen);
  } catch (error) {
    res.status(500).json({ message: 'Error creating dosen' , error: error.message });
  }
};

exports.deleteDosen = async (req, res) => {
  const { id } = req.params;

  try {
    await DosenModel.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting dosen' });
  }
};

exports.editDosen = async (req, res) => {
  const { id } = req.params;
  const { NIY, nama, alamat, jabatan } = req.body;

  try {
    const updatedDosen = await DosenModel.findByIdAndUpdate(
      id,
      { nama, alamat, jabatan },
      { new: true }
    );
    res.json(updatedDosen);
  } catch (error) {
    res.status(500).json({ message: 'Error editing dosen' });
  }
};
