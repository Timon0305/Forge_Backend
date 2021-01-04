const mongoose = require('mongoose');

const CoolingSchema = new mongoose.Schema({
    name: {
        type: String
    },
    image: {
        type: String
    },
    rpm: {
        type: String
    },
    noise: {
        type: String,
    },
    color: {
        type: String,
    },
    radiator: {
        type: String,
    },
    price: {
        type: String
    }
});



module.exports = mongoose.model('Cooling', CoolingSchema);
