const mongoose = require('mongoose');

const scanResultSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    itemDescription: {
        type: String,
        required: true
    },
    aiResponse: {
        type: Object,
        required: true
    },
    imageReference: {
        type: String,
        required: false
    },
    // Optional: Add more fields as needed
    metadata: {
        type: Object,
        default: {}
    }
}, { timestamps: true });

const ScanResult = mongoose.model('ScanResult', scanResultSchema);

module.exports = ScanResult;