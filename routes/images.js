const express = require('express')
const {getImages, createImages, imageById, singleImage, updateImages, deleteImage, isAdmin} = require('../controllers/images')
const {createImageValidator} = require('../validator')
const { requireSignin } = require('../controllers/auth');

router = express.Router()

router.get('/image', getImages)
router.get('/image/:imageId', singleImage)
router.post('/image/new', requireSignin, createImages, createImageValidator)
router.put('/image/edit/:imageId', requireSignin,  updateImages)
router.delete('/image/delete/:imageId', requireSignin, isAdmin, deleteImage);

router.param('imageId', imageById);

module.exports = router