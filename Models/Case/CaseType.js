const mongoose = require('mongoose');

const CaseType = new mongoose.Schema({
    name: {
        type: String
    },
    status: {
        type: Boolean,
        value: false
    },
});

module.exports = mongoose.model('CaseType', CaseType);
