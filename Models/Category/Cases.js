const mongoose = require('mongoose');

const CaseSchema = new mongoose.Schema({
    name: {
        type: String
    },
    image: {
        type: String
    },
    type: {
        type: String
    },
    color: {
        type: String,
    },
    power: {
        type: String,
    },
    side: {
        type: String,
    },
    external: {
        type: String
    },
    internal: {
        type: String
    },
    price: {
        type: String
    }
});



module.exports = mongoose.model('Case', CaseSchema);
