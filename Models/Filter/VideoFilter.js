const mongoose = require('mongoose');

const VideoFilterSchema = new mongoose.Schema({
    name: {
        type: String
    },
    status: {
        type: Boolean,
        value: false
    },
});

module.exports = mongoose.model('VideoFilter', VideoFilterSchema);
