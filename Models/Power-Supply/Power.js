const mongoose = require('mongoose');

const PowerSchema = new mongoose.Schema({
    name: {
        type: String
    },
    image: {
        type: String
    },
    factor: {
        type: String
    },
    efficiency: {
        type: String,
    },
    wattage: {
        type: String,
    },
    modular: {
        type: String,
    },
    color: {
        type: String
    },
    price: {
        type: String
    }
});



module.exports = mongoose.model('Power', PowerSchema);
