const express = require('express');
const routerUpload = express.Router();
const { uploadFile } = require('../controllers/uploadController');

routerUpload.post('/upload', uploadFile);

module.exports = routerUpload;
