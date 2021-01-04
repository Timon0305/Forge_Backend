const mongoose = require('mongoose');

const SoftwareFilterSchema = new mongoose.Schema({
    name: {
        type: String
    },
    status: {
        type: Boolean,
        value: false
    },
});

module.exports = mongoose.model('SoftwareFilter', SoftwareFilterSchema);
