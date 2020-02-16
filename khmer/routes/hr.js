const express = require('express')
const {createhr, gethrs, hrsByUser, photo, hrById, singlehr, updatehr, deletehr, isAdmin} = require('../controllers/khmerHr')
// const {createhrValidator} = require('../../validator')
// const { requireSignin } = require('../controllers/auth');
const { userById } = require('../../general/controllers/user');


router = express.Router()

router.get('/khmerhr', gethrs)
router.get('/khmerhr/:hrId', singlehr)
router.post('/khmerhr/new/:userId', createhr)
router.put('/khmerhr/edit/:hrId', updatehr)
router.delete('/khmerhr/delete/:hrId', deletehr);

router.get('/khmerhr/photo/:hrId', photo);

router.param('userId', userById);
router.param('hrId', hrById);

module.exports = router