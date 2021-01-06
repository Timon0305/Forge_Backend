const mongoose = require('mongoose');

const MotherboardFactor = new mongoose.Schema({
    name: {
        type: String
    },
    status: {
        type: Boolean,
        value: false
    },
});

module.exports = mongoose.model('MotherboardFactor', MotherboardFactor);
