const mongoose = require('mongoose');

const StorageSchema = new mongoose.Schema({
    name: {
        type: String
    },
    image: {
        type: String
    },
    capacity: {
        type: String
    },
    gbprice: {
        type: String,
    },
    type: {
        type: String,
    },
    cache: {
        type: String,
    },
    factor: {
        type: String
    },
    interface: {
        type: String
    },
    price: {
        type: String
    }
});

module.exports = mongoose.model('Storage', StorageSchema);
