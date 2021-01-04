const mongoose = require('mongoose');

const SoftwareSchema = new mongoose.Schema({
    name: {
        type: String
    },
    image: {
        type: String
    },
    type: {
        type: String
    },
    mode: {
        type: String,
    },
    maximum: {
        type: String,
    },
    price: {
        type: String
    }
});



module.exports = mongoose.model('Software', SoftwareSchema);
