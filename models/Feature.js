const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema({
    history: {
        type: [],
        required: true,
    },
    waiting: {
        type: [],
        required: true,

    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
})

module.exports = mongoose.model('features', featureSchema);