const mongoose = require('mongoose');

const VideoChipSet = new mongoose.Schema({
    name: {
        type: String
    },
    status: {
        type: Boolean,
        value: false
    },
});

module.exports = mongoose.model('VideoChipSet', VideoChipSet);
