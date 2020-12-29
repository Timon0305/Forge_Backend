const mongoose = require('mongoose');

const CpuFilterSchema = new mongoose.Schema({
    name: {
        type: String
    },
    status: {
        type: Boolean,
        value: false
    },
});

module.exports = mongoose.model('CpuFilter', CpuFilterSchema);
