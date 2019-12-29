const express = require('express')
const {getspanishImages, createspanishImages, spanishImageById, singleSpanishImages, photo, updatespanishImages, deleteSpanishImages, isAdmin} = require('../controllers/spanishImages')
//const {createImageValidator} = require('../../validator')
// const { requireSignin } = require('../controllers/auth');
const { userById } = require('../../general/controllers/user');

router = express.Router()

router.get('/spanishImage', getspanishImages)
router.get('/spanishImage/:spanishImageId', singleSpanishImages)
router.post('/spanishImage/new/:userId', createspanishImages)
router.put('/spanishImage/edit/:spanishImageId',  updatespanishImages)
router.delete('/spanishImage/delete/:spanishImageId', deleteSpanishImages);

router.get('/image/photo/:imageId', photo);


router.param('imageId', spanishImageById);
router.param('userId', userById);

module.exports = router