const mongoose = require('mongoose');
//const Schema = mongoose.Schema;

const playlistSchema = new mongoose.Schema({
    song: {
        type: [],
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
})

module.exports = mongoose.model('playlists', playlistSchema);