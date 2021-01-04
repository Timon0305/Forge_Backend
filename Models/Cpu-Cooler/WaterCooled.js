const mongoose = require('mongoose');

const WaterCooled = new mongoose.Schema({
    name: {
        type: String
    },
    status: {
        type: Boolean,
        value: false
    },
});

module.exports = mongoose.model('WaterCooled', WaterCooled);
