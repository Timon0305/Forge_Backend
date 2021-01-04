const mongoose = require('mongoose');

const MemorySchema = new mongoose.Schema({
    name: {
        type: String
    },
    image: {
        type: String
    },
    speed: {
        type: String
    },
    modules: {
        type: String,
    },
    gbprice: {
        type: String,
    },
    color: {
        type: String,
    },
    flatency: {
        type: String
    },
    clatency: {
        type: String
    },
    price: {
        type: String
    }
});



module.exports = mongoose.model('Memory', MemorySchema);
