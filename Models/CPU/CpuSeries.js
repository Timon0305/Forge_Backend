const mongoose = require('mongoose');

const CpuSeries = new mongoose.Schema({
    name: {
        type: String
    },
    status: {
        type: Boolean,
        value: false
    },
});

module.exports = mongoose.model('CpuSeries', CpuSeries);
