const User = require('../../models/User');
const Feature = require('../../models/Feature');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {
    register: async (req, res) => {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);

        try {
            const newUser = new User({
                username: req.body.username,
                password: hash
            });
            const user = await newUser.save();

            const newFeature = new Feature({
                user: user._id
            })
            await newFeature.save();
            res.status(200).json({user, msg:"dang ky thanh cong"});
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    },
    login: async (req, res) => {
        try {
            const user = await User.findOne({username: req.body.username});
            if (!user) {
                res.status(404).json("username ko dung");
            }

            const validPassword = await bcrypt.compare(
                req.body.password, user.password
            );

            if(!validPassword) {
                res.status(404).json("password ko dung");
            }

            if (user && validPassword) {
                const token = jwt.sign({
                    id: user.id,
                }, process.env.JWT_KEY_TOKEN);
                user.token = token;
                await user.save();
                res.status(200).json({user, msg: "dang nhap thanh cong"});
            }
        } catch (error) {
            res.status(500).json({msg: error.message});
        } 
    },
    logout: async(req, res) => {
        try {
            const id = req.user.id;
            const user = await User.findById(id);
            user.token = null;
            await user.save();
            res.status(200).json("dang xuat thanh cong");
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    }
}

module.exports = authController;