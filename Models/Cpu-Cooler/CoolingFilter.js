const mongoose = require('mongoose');

const CoolingFilterSchema = new mongoose.Schema({
    name: {
        type: String
    },
    status: {
        type: Boolean,
        value: false
    },
});

module.exports = mongoose.model('CoolingFilter', CoolingFilterSchema);
