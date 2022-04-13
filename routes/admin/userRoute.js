const express = require('express');
const userController = require('../../controllers/admin/userController');
const router = express.Router();

// Get All
router.get('/admin/user', userController.getUsers)

//Create
router.post('/admin/user', userController.addUser)

//Detele
router.delete('/admin/user/:id', userController.deteleUser)

module.exports = router;
