const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    song: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true
    },
    author: {
        type: String,
        required: true,
    },
    genres: {
        type: [String],
        enum: ["Vui", "Buồn"]
    }
})

musicSchema.index({song: 'text'});

const Musics = mongoose.model('musics', musicSchema);

Musics.createIndexes({song: 'text'});

module.exports = Musics;