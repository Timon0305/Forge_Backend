const mongoose = require('mongoose');

const PowerModular = new mongoose.Schema({
    name: {
        type: String
    },
    status: {
        type: Boolean,
        value: false
    },
});

module.exports = mongoose.model('PowerModular', PowerModular);
