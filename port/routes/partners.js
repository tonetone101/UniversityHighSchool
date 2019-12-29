const express = require('express')
const {getportPartners, createportPartners, portPartnersById, singleportPartners, photo, updateportPartners, deleteportPartners} = require('../controllers/portPartners')
// const {createportPartnersValidator} = require('../validator')
// const { requireSignin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router = express.Router()

router.get('/portPartners', getportPartners)
router.get('/portPartners/:portPartnersId', singleportPartners)
router.post('/portPartners/new/:userId',  createportPartners)
router.put('/portPartners/edit/:portPartnersId',  updateportPartners)
router.delete('/portPartners/delete/:portPartnersId',  deleteportPartners);

router.get('/portPartners/photo/:portPartnersId', photo);

router.param('userId', userById);
router.param('portPartnersId', portPartnersById);

module.exports = router