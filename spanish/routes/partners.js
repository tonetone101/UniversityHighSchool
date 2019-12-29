const express = require('express')
const {getspanishPartners, createspanishPartners, spanishPartnersById, singlespanishPartners, photo, updatespanishPartners, deletespanishPartners} = require('../controllers/spanishPartners')
// const {createspanishPartnersValidator} = require('../validator')
// const { requireSignin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router = express.Router()

router.get('/spanishPartners', getspanishPartners)
router.get('/spanishPartners/:spanishPartnersId', singlespanishPartners)
router.post('/spanishPartners/new/:userId',  createspanishPartners)
router.put('/spanishPartners/edit/:spanishPartnersId',  updatespanishPartners)
router.delete('/spanishPartners/delete/:spanishPartnersId',  deletespanishPartners);

router.get('/spanishPartners/photo/:spanishPartnersId', photo);

router.param('userId', userById);
router.param('spanishPartnersId', spanishPartnersById);

module.exports = router