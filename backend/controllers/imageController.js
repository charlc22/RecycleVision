// controllers/imageController.js
const ImageMetadata = require('../models/ImageMetadata');
const multer = require('multer');  // Multer is a middleware for handling file uploads

// Configure multer for image storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')  // Ensure this directory exists
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});

const upload = multer({ storage: storage });

exports.uploadImage = upload.single('imageFile'), (req, res) => {
    try {
        const { isRecyclable } = req.body;
        const newImageMetadata = new ImageMetadata({
            filename: req.file.filename,
            imagePath: req.file.path,
            isRecyclable
        });
        const savedMetadata = await newImageMetadata.save();
        res.status(201).send(savedMetadata);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};