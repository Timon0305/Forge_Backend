const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    name: {
        type: String
    },
    image: {
        type: String
    },
    chipset: {
        type: String
    },
    memory: {
        type: String,
    },
    coreClock: {
        type: String,
    },
    boostClock: {
        type: String,
    },
    color: {
        type: String
    },
    length: {
        type: String
    },
    price: {
        type: String
    }
});



module.exports = mongoose.model('Video', VideoSchema);
