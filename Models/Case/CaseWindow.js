const mongoose = require('mongoose');

const CaseWindow = new mongoose.Schema({
    name: {
        type: String
    },
    status: {
        type: Boolean,
        value: false
    },
});

module.exports = mongoose.model('CaseWindow', CaseWindow);
