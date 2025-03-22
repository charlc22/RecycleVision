// models/ImageMetadata.js
const mongoose = require('mongoose');

const imageMetadataSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    uploadDate: { type: Date, default: Date.now },
    isRecyclable: { type: Boolean, required: true }
});

const ImageMetadata = mongoose.model('ImageMetadata', imageMetadataSchema);

module.exports = ImageMetadata;
