const express = require('express')
const {createhr, gethrs, hrsByUser, photo, hrById, singlehr, updatehr, deletehr, isAdmin} = require('../controllers/portHr')
// const {createhrValidator} = require('../../validator')
// const { requireSignin } = require('../controllers/auth');
const { userById } = require('../../general/controllers/user');


router = express.Router()

router.get('/porthr', gethrs)
router.get('/porthr/:hrId', singlehr)
router.post('/porthr/new/:userId', createhr)
router.put('/porthr/edit/:hrId', updatehr)
router.delete('/porthr/delete/:hrId', deletehr);

router.get('/porthr/photo/:hrId', photo);

router.param('userId', userById);
router.param('hrId', hrById);

module.exports = router