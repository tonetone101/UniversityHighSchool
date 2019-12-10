const express = require('express');
const router = express.Router();

const {userById, allUsers, getUser, updateUser, deleteUser, userPhoto, findPeople, hasAuthorization } = require('../controllers/user');
const {requireSignin} = require('../controllers/auth');

//photo
router.get('/user/photo/:userId', userPhoto)

router.get('/users', allUsers) // to see all users
router.get('/user/:userId', requireSignin, getUser) // to see single user
router.put('/user/:userId', requireSignin, hasAuthorization, updateUser) // to update
router.delete('/user/:userId', requireSignin, hasAuthorization, deleteUser) // to deletes

//photo
router.get('/user/photo/:userId', userPhoto)

router.param('userId', userById)

module.exports = router;