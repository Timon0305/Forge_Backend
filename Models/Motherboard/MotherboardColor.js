const mongoose = require('mongoose');

const MotherboardColor = new mongoose.Schema({
    name: {
        type: String
    },
    status: {
        type: Boolean,
        value: false
    },
});

module.exports = mongoose.model('MotherboardColor', MotherboardColor);
