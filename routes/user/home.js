const express = require('express');
const authController = require('../../controllers/user/authController');
const userController = require('../../controllers/user/userController')
const verifyToken = require('../../middleware/verifyToken');
const router = express.Router();

//get all music
// router.get('/user')
//get one | play
router.post('/user/play/:id', verifyToken, userController.getMusic)

//register
router.post('/user/register', authController.register)

//login
router.post('/user/login', authController.login)

//logout
router.post('/user/logout', verifyToken,authController.logout)

//history
router.get('/user/history', verifyToken, userController.getHistory)

//add playlist
router.post('/user/addplaylist', verifyToken, userController.addPlaylist)

//add music to playlist
router.post('/user/playlist/add', verifyToken, userController.addMusicToPlaylist)

//show all playlist
router.get('/user/playlist', verifyToken, userController.getPlaylist)


module.exports = router;
