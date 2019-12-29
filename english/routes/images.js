const express = require('express')
const {getImages, createImages, imageById, singleImage, photo, updateImages, deleteImage, isAdmin} = require('../controllers/images')
const {createImageValidator} = require('../../validator')
// const { requireSignin } = require('../controllers/auth');
const { userById } = require('../../general/controllers/user');

router = express.Router()

router.get('/image', getImages)
router.get('/image/:imageId', singleImage)
router.post('/image/new/:userId', createImages, createImageValidator)
router.put('/image/edit/:imageId',  updateImages)
router.delete('/image/delete/:imageId', deleteImage);

router.get('/image/photo/:imageId', photo);


router.param('imageId', imageById);
router.param('userId', userById);

module.exports = router