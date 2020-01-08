const express = require('express')
const {getPartners, createPartners, partnersById, singlePartners, photo, updatePartners, deletePartners} = require('../controllers/khmerPartners')
// const {createkhmerPartnersValidator} = require('../validator')
// const { requireSignin } = require('../controllers/auth');
const { userById } = require('../../general/controllers/user');

router = express.Router()

router.get('/khmerPartners', getPartners)
router.get('/khmerPartners/:khmerPartnersId', singlePartners)
router.post('/khmerPartners/new/:userId',  createPartners)
router.put('/khmerPartners/edit/:khmerPartnersId',  updatePartners)
router.delete('/khmerPartners/delete/:khmerPartnersId',  deletePartners);

router.get('/khmerPartners/photo/:khmerPartnersId', photo);

router.param('userId', userById);
router.param('khmerPartnersId', partnersById);

module.exports = router