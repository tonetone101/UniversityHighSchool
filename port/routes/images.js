const express = require('express')
const {getportImages, createportImages, portImageById, singleportImage, photo, updateportImages, deleteportImage, isAdmin} = require('../controllers/portImages')
//const {createportImageValidator} = require('../../validator')
// const { requireSignin } = require('../controllers/auth');
const { userById } = require('../../general/controllers/user');

router = express.Router()

router.get('/portImage', getportImages)
router.get('/portImage/:portImageId', singleportImage)
router.post('/portImage/new/:userId', createportImages)
router.put('/portImage/edit/:portImageId',  updateportImages)
router.delete('/portImage/delete/:portImageId', deleteportImage);

router.get('/portImage/photo/:portImageId', photo);


router.param('portImageId', portImageById);
router.param('userId', userById);

module.exports = router