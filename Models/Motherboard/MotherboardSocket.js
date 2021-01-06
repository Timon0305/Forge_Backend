const mongoose = require('mongoose');

const MotherboardSocket = new mongoose.Schema({
    name: {
        type: String
    },
    status: {
        type: Boolean,
        value: false
    },
});

module.exports = mongoose.model('MotherboardSocket', MotherboardSocket);
