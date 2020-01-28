const express = require('express')
const {getkhmerapplication, createkhmerapplication, khmerapplicationById, singlekhmerapplication, photo, updatekhmerapplication, deletekhmerapplication, isAdmin} = require('../controllers/application')
// const {createkhmerapplicationValidator} = require('../../validator')
// const { requireSignin } = require('../controllers/auth');
const { userById } = require('../../general/controllers/user');

router = express.Router()

router.get('/khmerapplication', getkhmerapplication)
router.get('/khmerapplication/:khmerapplicationId', singlekhmerapplication)
router.post('/khmerapplication/new/:userId',  createkhmerapplication)
router.put('/khmerapplication/edit/:khmerapplicationId',  updatekhmerapplication)
router.delete('/khmerapplication/delete/:khmerapplicationId',  deletekhmerapplication);

router.get('/khmerapplication/photo/:khmerapplicationId', photo);

router.param('userId', userById);
router.param('khmerapplicationId', khmerapplicationById);

module.exports = router