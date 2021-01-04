const mongoose = require('mongoose');

const PowerFilterSchema = new mongoose.Schema({
    name: {
        type: String
    },
    status: {
        type: Boolean,
        value: false
    },
});

module.exports = mongoose.model('PowerFilter', PowerFilterSchema);
