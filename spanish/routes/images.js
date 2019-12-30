const express = require('express')
const {getspanishImages, createspanishImages, spanishImageById, singlespanishImage, photo, updatespanishImages, deletespanishImages, isAdmin} = require('../controllers/spanishImages')
//const {createImageValidator} = require('../../validator')
// const { requireSignin } = require('../controllers/auth');
const { userById } = require('../../general/controllers/user');

router = express.Router()

router.get('/spanishImage', getspanishImages)
router.get('/spanishImage/:spanishimageId', singlespanishImage)
router.post('/spanishImage/new/', createspanishImages)
router.put('/spanishImage/edit/:spanishimageId',  updatespanishImages)
router.delete('/spanishImage/delete/:spanishimageId', deletespanishImages);

router.get('/spanishimage/photo/:spanishimageId', photo);

router.param('spanishimageId', spanishImageById);
router.param('userId', userById);

module.exports = router