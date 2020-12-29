const mongoose = require('mongoose');

const StorageFilterSchema = new mongoose.Schema({
    name: {
        type: String
    },
    status: {
        type: Boolean,
        value: false
    },
});

module.exports = mongoose.model('StorageFilter', StorageFilterSchema);
