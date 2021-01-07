const mongoose = require('mongoose');

const PowerColor = new mongoose.Schema({
    name: {
        type: String
    },
    status: {
        type: Boolean,
        value: false
    },
});

module.exports = mongoose.model('PowerColor', PowerColor);
