const express = require('express')
const {createhr, gethrs, hrsByUser, photo, hrById, singlehr, updatehr, deletehr, isAdmin} = require('../controllers/spanishHr')
// const {createhrValidator} = require('../../validator')
// const { requireSignin } = require('../controllers/auth');
const { userById } = require('../../general/controllers/user');


router = express.Router()

router.get('/spanishhr', gethrs)
router.get('/spanishhr/:hrId', singlehr)
router.post('/spanishhr/new/:userId', createhr)
router.put('/spanishhr/edit/:hrId', updatehr)
router.delete('/spanishhr/delete/:hrId', deletehr);

router.get('/spanishhr/photo/:hrId', photo);

router.param('userId', userById);
router.param('hrId', hrById);

module.exports = router