const express = require('express')
const {getPartners, createPartners, partnersById, singlePartners, photo, updatePartners, deletePartners} = require('../controllers/spanishPartners')
// const {createspanishPartnersValidator} = require('../validator')
// const { requireSignin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router = express.Router()

router.get('/spanishPartners', getPartners)
router.get('/spanishPartners/:spanishPartnersId', singlePartners)
router.post('/spanishPartners/new/:userId',  createPartners)
router.put('/spanishPartners/edit/:spanishPartnersId',  updatePartners)
router.delete('/spanishPartners/delete/:spanishPartnersId',  deletePartners);

router.get('/spanishPartners/photo/:spanishPartnersId', photo);

router.param('userId', userById);
router.param('spanishPartnersId', partnersById);

module.exports = router