const express = require('express')
const {gethmongPartners, createhmongPartners, hmongPartnersById, singlehmongPartners, photo, updatehmongPartners, deletehmongPartners} = require('../controllers/hmongPartners')
// const {createhmongPartnersValidator} = require('../validator')
// const { requireSignin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router = express.Router()

router.get('/hmongPartners', gethmongPartners)
router.get('/hmongPartners/:hmongPartnersId', singlehmongPartners)
router.post('/hmongPartners/new/:userId',  createhmongPartners)
router.put('/hmongPartners/edit/:hmongPartnersId',  updatehmongPartners)
router.delete('/hmongPartners/delete/:hmongPartnersId',  deletehmongPartners);

router.get('/hmongPartners/photo/:hmongPartnersId', photo);

router.param('userId', userById);
router.param('hmongPartnersId', hmongPartnersById);

module.exports = router