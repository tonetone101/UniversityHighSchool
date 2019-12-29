const express = require('express')
const {gethmongImages, createhmongImages, hmongImageById, singlehmongImage, photo, updatehmongImages, deletehmongImage, isAdmin} = require('../controllers/hmongImages')
//const {createhmongImageValidator} = require('../../validator')
// const { requireSignin } = require('../controllers/auth');
const { userById } = require('../../general/controllers/user');

router = express.Router()

router.get('/hmongImage', gethmongImages)
router.get('/hmongImage/:hmongImageId', singlehmongImage)
router.post('/hmongImage/new/:userId', createhmongImages)
router.put('/hmongImage/edit/:hmongImageId',  updatehmongImages)
router.delete('/hmongImage/delete/:hmongImageId', deletehmongImage);

router.get('/hmongImage/photo/:hmongImageId', photo);


router.param('hmongImageId', hmongImageById);
router.param('userId', userById);

module.exports = router