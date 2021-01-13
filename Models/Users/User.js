const mongoose = require('mongoose');
const normalize = require('normalize-mongoose');

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Valid email address required'
        ],
        required: [true, 'Email address is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date,
});

UserSchema.plugin(normalize);

UserSchema.pre('save', async function (next) {
    this.updatedAt = new Date(Date.now())
});

module.exports = mongoose.model('User', UserSchema);