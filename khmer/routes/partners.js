const express = require('express')
const {getkhmerPartners, createkhmerPartners, khmerPartnersById, singlekhmerPartners, photo, updatekhmerPartners, deletekhmerPartners} = require('../controllers/khmerPartners')
// const {createkhmerPartnersValidator} = require('../validator')
// const { requireSignin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router = express.Router()

router.get('/khmerPartners', getkhmerPartners)
router.get('/khmerPartners/:khmerPartnersId', singlekhmerPartners)
router.post('/khmerPartners/new/:userId',  createkhmerPartners)
router.put('/khmerPartners/edit/:khmerPartnersId',  updatekhmerPartners)
router.delete('/khmerPartners/delete/:khmerPartnersId',  deletekhmerPartners);

router.get('/khmerPartners/photo/:khmerPartnersId', photo);

router.param('userId', userById);
router.param('khmerPartnersId', khmerPartnersById);

module.exports = router