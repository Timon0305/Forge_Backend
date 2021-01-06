const mongoose = require('mongoose');

const MemoryModule = new mongoose.Schema({
    name: {
        type: String
    },
    status: {
        type: Boolean,
        value: false
    },
});

module.exports = mongoose.model('MemoryModule', MemoryModule);
