const Musics = require('../../models/Music');
const APIFeatures = require('../../features/features');

const musicController = {
    getMusics: async(req, res) => {
        try {
            const features = new APIFeatures(Musics.find(), req.query).paginating().searching();
            const musics = await features.mongooseQuery;
            res.status(200).json({musics});
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
        //res.json({msg: "get all product"})
    },
    addMusic: async(req, res) => {
        try {
            const newMusic = new Musics({
                id: req.body.id,
                song: req.body.song,
                duration: req.body.duration,
                author: req.body.author,
                genres:req.body.genres
            });
            await newMusic.save();
            res.status(200).json({msg: "add successful"});
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
        //res.json({msg: "add new product"})
    },
    updateMusic: async(req, res) => {
        try {
            const {id, song, duration , author, genres} = req.body;
            const music = await Musics.findOneAndUpdate({id: req.params.id}, {
                id, song, duration , author, genres
            }, {new: true});

            if(!music) {
                res.status(404).json({msg: "this music doesn't exist"});
            }
            
            res.status(200).json({msg: "update successful"});

        } catch (error) {
            res.status(500).json({msg: error.message});
        }
        //res.json({msg: `update a product by id ${req.params.id}`})
    },
    deteleMusic: async(req, res) => {
        try {
            const music = await Musics.findOneAndDelete({id: req.params.id});

            if (!music) {
                res.status(404).json({msg: "this music doesn't exist"});
            }

            res.status(200).json({msg: "delete successful"});
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
        //res.json({msg: `delete a product by id ${req.params.id}`})
    }
}

module.exports = musicController;