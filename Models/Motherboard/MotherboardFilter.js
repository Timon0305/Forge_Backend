const mongoose = require('mongoose');

const MotherboardFilterSchema = new mongoose.Schema({
    name: {
        type: String
    },
    status: {
        type: Boolean,
        value: false
    },
});

module.exports = mongoose.model('MotherboardFilter', MotherboardFilterSchema);
