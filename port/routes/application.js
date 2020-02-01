const express = require('express')
const {getportapplication, createportapplication, portapplicationById, singleportapplication, photo, updateportapplication, deleteportapplication, isAdmin} = require('../controllers/portapplication')
// const {createportapplicationValidator} = require('../../validator')
// const { requireSignin } = require('../controllers/auth');
const { userById } = require('../../general/controllers/user');

router = express.Router()

router.get('/portapplication', getportapplication)
router.get('/portapplication/:portapplicationId', singleportapplication)
router.post('/portapplication/new/:userId',  createportapplication)
router.put('/portapplication/edit/:portapplicationId',  updateportapplication)
router.delete('/portapplication/delete/:portapplicationId',  deleteportapplication);

router.get('/portapplication/photo/:portapplicationId', photo);

router.param('userId', userById);
router.param('portapplicationId', portapplicationById);

module.exports = router