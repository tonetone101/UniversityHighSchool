const express = require('express')
const {getkhmerImages, createkhmerImages, khmerImageById, singlekhmerImage, photo, updatekhmerImages, deletekhmerImage, isAdmin} = require('../controllers/khmerImages')
//const {createkhmerImageValidator} = require('../../validator')
// const { requireSignin } = require('../controllers/auth');
const { userById } = require('../../general/controllers/user');

router = express.Router()

router.get('/khmerImage', getkhmerImages)
router.get('/khmerImage/:khmerImageId', singlekhmerImage)
router.post('/khmerImage/new/:userId', createkhmerImages)
router.put('/khmerImage/edit/:khmerImageId',  updatekhmerImages)
router.delete('/khmerImage/delete/:khmerImageId', deletekhmerImage);

router.get('/khmerImage/photo/:khmerImageId', photo);


router.param('khmerImageId', khmerImageById);
router.param('userId', userById);

module.exports = router