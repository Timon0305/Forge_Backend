const mongoose = require('mongoose');

const PowerEfficiency = new mongoose.Schema({
    name: {
        type: String
    },
    status: {
        type: Boolean,
        value: false
    },
});

module.exports = mongoose.model('PowerEfficiency', PowerEfficiency);
