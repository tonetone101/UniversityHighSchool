const express = require('express')
const {getPartners, createPartners, partnersById, singlePartners, photo, updatePartners, deletePartners} = require('../controllers/portPartners')
// const {createportPartnersValidator} = require('../validator')
// const { requireSignin } = require('../controllers/auth');
const { userById } = require('../../general/controllers/user');

router = express.Router()

router.get('/portPartners', getPartners)
router.get('/portPartners/:portPartnersId', singlePartners)
router.post('/portPartners/new',  createPartners)
router.put('/portPartners/edit/:portPartnersId',  updatePartners)
router.delete('/portPartners/delete/:portPartnersId',  deletePartners);

router.get('/portPartners/photo/:portPartnersId', photo);

router.param('userId', userById);
router.param('portPartnersId', partnersById);

module.exports = router