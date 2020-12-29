const mongoose = require('mongoose');

const MemoryFilter = new mongoose.Schema({
    name: {
        type: String
    },
    status: {
        type: Boolean,
        value: false
    },
});

module.exports = mongoose.model('MemoryFilter', MemoryFilter);
