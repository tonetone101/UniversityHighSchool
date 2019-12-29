const express = require('express')
const {getPartners, createPartners, partnersById, singlePartners, photo, updatePartners, deletePartners} = require('../controllers/partners')
const {createPartnersValidator} = require('../validator')
// const { requireSignin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router = express.Router()

router.get('/partners', getPartners)
router.get('/partners/:partnersId', singlePartners)
router.post('/partners/new/:userId',  createPartners, createPartnersValidator)
router.put('/partners/edit/:partnersId',  updatePartners)
router.delete('/partners/delete/:partnersId',  deletePartners);

router.get('/partners/photo/:partnersId', photo);

router.param('userId', userById);
router.param('partnersId', partnersById);

module.exports = router