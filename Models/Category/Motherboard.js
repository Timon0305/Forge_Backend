const mongoose = require('mongoose');

const MotherBoardSchema = new mongoose.Schema({
    name: {
        type: String
    },
    image: {
        type: String
    },
    socket: {
        type: String
    },
    factor: {
        type: String,
    },
    max: {
        type: String,
    },
    slots: {
        type: String,
    },
    color: {
        type: String
    },
    price: {
        type: String
    }
});



module.exports = mongoose.model('Motherboard', MotherBoardSchema);
