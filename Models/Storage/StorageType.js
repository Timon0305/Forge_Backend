const mongoose = require('mongoose');

const StorageType = new mongoose.Schema({
    name: {
        type: String
    },
    status: {
        type: Boolean,
        value: false
    },
});

module.exports = mongoose.model('StorageType', StorageType);
