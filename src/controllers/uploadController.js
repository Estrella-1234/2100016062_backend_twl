const multer = require('multer');
const path = require('path');

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads/img'); // Specify the destination folder for uploaded files
    },
    filename: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname);
        const fileName = `${Date.now()}${fileExtension}`;
        cb(null, fileName); // Set the uploaded file's new name
    },
});

// Create the multer upload instance
const upload = multer({ storage: storage });

exports.uploadFile = (req, res) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            // Handle any upload errors
            console.error('Error uploading file:', err);
            res.status(500).json({ message: 'Error uploading file' });
        } else {
            if (!req.file) {
                return res.status(400).json({ message: 'No file uploaded' });
            }

            // Prepare the response with file information
            const data = {
                fileName: req.file.filename
            };
            res.json(data);
        }
    });
};

