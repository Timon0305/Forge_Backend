const mongoose = require('mongoose');

const CasePowerSupply = new mongoose.Schema({
    name: {
        type: String
    },
    status: {
        type: Boolean,
        value: false
    },
});

module.exports = mongoose.model('CasePowerSupply', CasePowerSupply);
