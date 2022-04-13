const Music = require('../../models/Music');
const Feature = require('../../models/Feature');
const Playlist = require('../../models/Playlist');
const APIFeatures = require('../../features/features');

const musicController = {
    //get one | play
    getMusic: async(req, res) => {
        try {
            const music = await Music.findOne({id: req.params.id});
            if(!music) {
                res.status(404).json({msg: "this music doesn't exist"});
            }
            await Feature.updateOne(
                { user: req.user.id},
                { $addToSet: { history: req.params.id}}
            );
            
            await Feature.updateOne(
                { user: req.user.id}, 
                { $push: { history:{ $each: [], $slice: -2} } }
            );
            res.status(200).json({msg: `play music ${req.params.id}`});
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
        //res.status(500).json("get one");
    },
    getHistory: async(req, res) => {
        try {
            const history = await Feature.find({user: req.user.id});
            //console.log(history[0].history);
            res.status(200).json({history: history[0].history});
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    },
    addPlaylist: async(req, res) => {
        try {
            const playlist = new Playlist({
                user: req.user.id,
                name: req.body.name
            });
            await playlist.save();
            res.status(200).json({playlist});
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    },
    addMusicToPlaylist: async(req, res) => {
        try {
            await Playlist.updateOne(
                {$and: [
                    {user: req.user.id},
                    {name: req.body.name}
                ]},
                { $addToSet: { song: req.body.song}}
            );
            res.status(200).json({msg: "addMusicToPlaylist success"});
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    },
    getPlaylist: async(req, res) => {
        try {
            const playlist = await Playlist.find({user: req.user.id});
            res.status(200).json({playlist});
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    }
}

module.exports = musicController;