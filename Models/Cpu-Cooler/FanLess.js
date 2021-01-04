const mongoose = require('mongoose');

const FanLess = new mongoose.Schema({
    name: {
        type: String
    },
    status: {
        type: Boolean,
        value: false
    },
});

module.exports = mongoose.model('FanLess', FanLess);
