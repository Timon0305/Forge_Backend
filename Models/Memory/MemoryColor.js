const mongoose = require('mongoose');

const MemoryColor = new mongoose.Schema({
    name: {
        type: String
    },
    status: {
        type: Boolean,
        value: false
    },
});

module.exports = mongoose.model('MemoryColor', MemoryColor);
